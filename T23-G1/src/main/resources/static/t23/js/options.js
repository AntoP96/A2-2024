function redirectToLogin() {
  if (confirm("Sei sicuro di voler effettuare il logout?")) {
    fetch("http://localhost/logout", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La richiesta di logout non è andata a buon fine");
        }
        console.log("Stai per essere reindirizzato alla pagina di login");
        window.location.href = "/login";
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

document
  .getElementById("historyButton")
  .addEventListener("mouseover", function () {
    showDescription("historyMsg");
  });

document
  .getElementById("historyButton")
  .addEventListener("mouseout", function () {
    hideDescription("historyMsg");
  });

document
  .getElementById("rankingButton")
  .addEventListener("mouseover", function () {
    showDescription("rankingMsg");
  });

document
  .getElementById("rankingButton")
  .addEventListener("mouseout", function () {
    hideDescription("rankingMsg");
  });

function showDescription(elementId) {
  document.getElementById(elementId).style.display = "block";
}

function hideDescription(elementId) {
  document.getElementById(elementId).style.display = "none";
}
