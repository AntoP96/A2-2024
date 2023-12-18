const apiHistory = "http://fastapi:8000/matchHistory";
const apiNameSurnamebyId = "/getNameSurnameById?id={idGiocatore}";

async function populateHistory(idGiocatore) {
    try {
        const response = await axios.get(`${apiHistory}?idGiocatore=${idGiocatore}`);
        const historyData = response.data.data.matches;

        const historyBody = document.getElementById("historyBody");

        // Clear existing rows
        historyBody.innerHTML = "";

        for (const match of historyData) {
            const winnerInfo = await getWinnerInfo(match.winner);

            // Mappa l'array di robot per ottenere tutti i nomi
            const robotNames = match.robots.map(robot => robot.name).join(", ");

            const row = createTableRow([
                match.match_id,
                robotNames,
                match.duration,
                match.classeTestata,
                match.difficulty,
                winnerInfo,
                match.scoreGiocatore,
                match.scoreRobot,
                match.dateStart,
                match.dateEnd,
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

function extractIdFromToken() {
    const token = getCookie("jwt");
    if (token) {
        const payload = parseJwt(token);
        //console.log("Contenuto JWT:", payload);
        if (payload) {
            const userId = payload.userId;
            //console.log("ID dell'utente estratto dal JWT:", userId);
            return userId;
        }
    }
    return null;
}

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

document.addEventListener("DOMContentLoaded", (e) => {
    const idGiocatore = extractIdFromToken();
    if (idGiocatore) {
        populateHistory(idGiocatore);
    } else {
        console.error("IdGiocatore non valido.");
    }
});

function redirectToHome() {
    window.location.href = "/options";
}