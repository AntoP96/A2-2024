const apiClassifica = 'http://localhost:8080/ranking';
const apiNameSurnamebyId = '/getNameSurnameById?id={idGiocatore}';

async function populateClassifica() {
  try {
    const response = await axios.get(apiClassifica);
    const classificaData = response.data.data.ranking;

    const classificaBody = document.getElementById('classificaBody');

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

async function getNomeCognomeById(idGiocatore) {
  try {
    const response = await axios.get(apiNameSurnamebyId.replace('{idGiocatore}', idGiocatore));
    return response.data;
  } catch (error) {
    console.error(`Errore durante la richiesta del nome e cognome per id ${idGiocatore}:`, error);
    return '';
  }
}

function createTableRow(dataArray) {
  const row = document.createElement('tr');
  dataArray.forEach((data) => {
    const cell = document.createElement('td');
    cell.textContent = data;
    row.appendChild(cell);
  });
  return row;
}

function setContainerSize() {
  const container = document.querySelector('.container');
  const table = document.querySelector('table');
  container.style.height = `${table.offsetHeight + 50}px`;
  container.style.width = `${table.offsetWidth + 50}px`;
}

function redirectToHome() {
  window.location.href = '/options';
}

populateClassifica();