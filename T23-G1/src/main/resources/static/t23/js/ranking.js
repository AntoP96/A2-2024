const apiClassifica = 'http://fastapi:8000/ranking';
const apiNameSurnamebyId = '/getNameSurnameById?id={idGiocatore}';

document.addEventListener("DOMContentLoaded", function() {
  populateRanking();
});

// Funzione principale per ottenere la classifica e popolare la tabella HTML
async function populateRanking() {
  try {
    const response = await axios.get(apiClassifica);
    const classificaData = response.data.data.ranking;

    const classificaBody = document.getElementById('classificaBody');
    classificaBody.innerHTML = '';

    for (const giocatore of classificaData) {
      const nomeCognome = await getNomeCognomeById(giocatore.idGiocatore);
      const row = createTableRow([
        nomeCognome, 
        giocatore.partiteTotali, 
        giocatore.partiteVinte, 
        giocatore.partitePerse, 
        giocatore.score
      ]);
      classificaBody.appendChild(row);
    }

    setContainerSize();
  } catch (error) {
    console.error('Errore durante la richiesta API della classifica:', error);
  }
}

// Funzione per ottenere nome e cognome del giocatore dall'id
async function getNomeCognomeById(idGiocatore) {
  try {
    const response = await axios.get(apiNameSurnamebyId.replace('{idGiocatore}', idGiocatore));
    return response.data;
  } catch (error) {
    console.error(`Errore durante la richiesta del nome e cognome per id ${idGiocatore}:`, error);
    return '';
  }
}

// Funzione per creare le righe della tabella
function createTableRow(dataArray) {
  const row = document.createElement('tr');
  dataArray.forEach((data) => {
    const cell = document.createElement('td');
    cell.textContent = data;
    row.appendChild(cell);
  });
  return row;
}

function redirectToHome() {
  window.location.href = '/options';
}