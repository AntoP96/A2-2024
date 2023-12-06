const apiClassifica = 'http://localhost:8080/ranking'; // Chiamta API per ottenere la classifica
const apiNameSurnamebyId = '/getNameSurnameById/{idGiocatore}'; // Chiamata al Controller per ottenere il nome e cognome del giocatore dall'id

// Funzione principale per ottenere la classifica e popolare la tabella HTML
async function populateClassifica() {
  try {
    const response = await axios.get(apiClassifica);
    const classificaData = response.data.data.ranking;

    const classificaBody = document.getElementById('classificaBody');

    for (const giocatore of classificaData) {
      const nomeCognome = await getNomeCognomeById(giocatore.idGiocatore);

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${nomeCognome}</td>
        <td>${giocatore.partiteTotali}</td>
        <td>${giocatore.partiteVinte}</td>
        <td>${giocatore.partitePerse}</td>
        <td>${giocatore.score}</td>
        <td>${giocatore.tempoDiGioco}</td>
      `;

      classificaBody.appendChild(row);
    }
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

// Funzione per impostare l'altezza del container
function setContainerHeight() {
  const container = document.querySelector('.container');
  const table = document.querySelector('table');
  const tableHeight = table.offsetHeight;
  container.style.height = `${tableHeight + 50}px`;
}

// Chiamata alla funzione principale
populateClassifica();