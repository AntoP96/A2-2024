function redirectToLogin() {
  if (confirm("Sei sicuro di voler effettuare il logout?")) {
    fetch("http://localhost/logout", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La richiesta di logout non è andata a buon fine");
        } else {
          console.log("stai per essere reindirizzato alla pagina di login");
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function redirectToGame() {
  window.location.href = "/main";
}

function redirectToHistory() {
  window.location.href = "/history";
}

function redirectToRanking() {
  window.location.href = "/ranking";
}

document.getElementById('historyButton').addEventListener('mouseover', function() {
  // Mostra la descrizione quando il mouse è sopra il bottone
  document.getElementById('historyMsg').style.display = 'block';
});

// Aggiungi un listener per l'evento mouseout al bottone
document.getElementById('historyButton').addEventListener('mouseout', function() {
  // Nascondi la descrizione quando il mouse esce dal bottone
  document.getElementById('historyMsg').style.display = 'none';
});

document.getElementById('rankingButton').addEventListener('mouseover', function() {
  // Mostra la descrizione quando il mouse è sopra il bottone
  document.getElementById('rankingMsg').style.display = 'block';
});

// Aggiungi un listener per l'evento mouseout al bottone
document.getElementById('rankingButton').addEventListener('mouseout', function() {
  // Nascondi la descrizione quando il mouse esce dal bottone
  document.getElementById('rankingMsg').style.display = 'none';
});