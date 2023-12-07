const apiHistory = "http://localhost:8080/matchHistory";
const apiNameSurnamebyId = "/getNameSurnameById?id={idGiocatore}";

// Funzione principale per ottenere lo storico partite e popolare la tabella HTML
async function populateHistory() {
    try {
        const response = await axios.get(apiHistory);
        const historyData = response.data.data.matches;

        const historyBody = document.getElementById("historyBody");

        for (const match of historyData) {
            const nomeCognome = await getNomeCognomeById(match.idGiocatore);
            const winnerInfo = await getWinnerInfo(match.winner);

            const row = createTableRow([
                nomeCognome,
                match.robots.name,
                match.duration,
                match.difficulty,
                winnerInfo,
                match.scoreGiocatore,
                match.scoreRobot,
                match.classeTestata,
                match.date,
            ]);

            historyBody.appendChild(row);
        }

        setContainerSize();
    } catch (error) {
        console.error("Errore durante la richiesta API dello storico partite:", error);
    }
}

// Funzione per ottenere nome e cognome del giocatore dall'id
async function getNomeCognomeById(idGiocatore) {
    try {
        const response = await axios.get(apiNameSurnamebyId.replace("{idGiocatore}", idGiocatore));
        return response.data;
    } catch (error) {
        console.error(`Errore durante la richiesta del nome e cognome per id ${idGiocatore}:`, error);
        return "";
    }
}

// Funzione per ottenere informazioni sul vincitore
async function getWinnerInfo(winner) {
    if (typeof winner === "string") {
        return winner;
    } else if (typeof winner === "number") {
        return await getNomeCognomeById(winner);
    } else {
        return "";
    }
}

// Funzione per creare una riga della tabella
function createTableRow(dataArray) {
    const row = document.createElement("tr");
    dataArray.forEach((data) => {
        const cell = document.createElement("td");
        cell.textContent = data;
        row.appendChild(cell);
    });
    return row;
}

// Funzione per impostare le dimensioni del container
function setContainerSize() {
    const container = document.querySelector(".container");
    const table = document.querySelector("table");
    container.style.height = `${table.offsetHeight + 50}px`;
    container.style.width = `${table.offsetWidth + 50}px`;
}

function redirectToHome() {
    window.location.href = "/options";
}

// Chiamata alla funzione principale
populateHistory();