const apiHistory = "http://localhost:8080/matchHistory"; // Chiamta API per ottenere lo storico partite
const apiNameSurnamebyId = "/getNameSurnameById?id={idGiocatore}"; // Chiamata al Controller per ottenere il nome e cognome del giocatore dall'id

// Funzione principale per ottenere la classifica e popolare la tabella HTML
async function populateHisotry() {
    try {
        const response = await axios.get(apiHistory);
        const historyData = response.data.data.matches;

        const historyBody = document.getElementById("historyBody");

        for (const match of historyData) {
            const nomeCognome = await getNomeCognomeById(match.idGiocatore);

            if (typeof match.winner === "string") {
                winnerInfo = match.winner;
            } else if (typeof match.winner === "number") {
                winnerInfo = await getNomeCognomeById(match.winner);
            } else {
                winnerInfo = "";
            }

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${nomeCognome}</td>
                <td>${match.robots.name}</td>
                <td>${match.duration}</td>
                <td>${match.difficulty}</td>
                <td>${winnerInfo}</td>
                <td>${match.scoreGiocatore}</td>
                <td>${match.scoreRobot}</td>
                <td>${match.classeTestata}</td>
                <td>${match.date}</td>
            `;

            historyBody.appendChild(row);
        }
    } catch (error) {
        console.error("Errore durante la richiesta API della classifica:", error);
    }
}

// Funzione per ottenere nome e cognome del giocatore dall'id
async function getNomeCognomeById(idGiocatore) {
    try {
        const response = await axios.get(
        apiNameSurnamebyId.replace("{idGiocatore}", idGiocatore)
        );
        return response.data;
    } catch (error) {
        console.error(
        `Errore durante la richiesta del nome e cognome per id ${idGiocatore}:`,
        error
        );
        return "";
    }
}

// Funzione per impostare l'altezza del container
function setContainerHeight() {
    const container = document.querySelector(".container");
    const table = document.querySelector("table");
    const tableHeight = table.offsetHeight;
    container.style.height = `${tableHeight + 50}px`;
}

function redirectToHome() {
    window.location.href = "/options";
}

// Chiamata alla funzione principale
populateHistory();