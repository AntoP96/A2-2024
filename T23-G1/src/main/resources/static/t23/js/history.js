const apiHistory = "http://fastapi:8000/matchHistory";
const apiNameSurnamebyId = "/getNameSurnameById?id={idGiocatore}";

document.addEventListener("DOMContentLoaded", function() {
    populateHistory();
});

// Funzione principale per ottenere lo storico partite e popolare la tabella HTML
async function populateHistory() {
    try {
        const response = await axios.get(apiHistory);
        const historyData = response.data.data.matches;

        const historyBody = document.getElementById("historyBody");

        for (const match of historyData) {
            const nomeCognome = await getNomeCognomeById(match.idGiocatore);
            const winnerInfo = await getWinnerInfo(match.winner);

            // Mappa l'array di robot per ottenere tutti i nomi
            const robotNames = match.robots.map(robot => robot.name).join(", ");

            const row = createTableRow([
                nomeCognome,
                robotNames,
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

// Funzione per creare le righe della tabella
function createTableRow(dataArray) {
    const row = document.createElement("tr");
    dataArray.forEach((data) => {
        const cell = document.createElement("td");
        cell.textContent = data;
        row.appendChild(cell);
    });
    return row;
}

function redirectToHome() {
    window.location.href = "/options";
}