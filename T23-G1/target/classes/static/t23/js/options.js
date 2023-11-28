function redirectToLogin() {
    if(confirm("Sei sicuro di voler effettuare il logout?")){
      fetch('http://localhost/logout', {
          method: 'GET',
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Richiesta logout non andata a buon fine');
          }
          else{
            console.log("stai per essere reindirizzato alla pagina di login");
            window.location.href = "/login";
          }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }

  function redirectToGame() {
    window.location.href = "/main";
  }

  function redirectToHistory(){
    window.location.href = "/history";
  }