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
