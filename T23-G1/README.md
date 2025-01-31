<h1>Testing Game</h1>
<h2>Gruppo A2 2023/24</h2>
<ul>
  <li>Antonio Paolino - M63001394 - antoni.paolino@studenti.unina.it</li>
  <li>Alberto Arola - M63001266 - al.arola@studenti.unina.it</li>
  <li>Alfonso Esposito - M63001406 - alfonso.esposito17@studenti.unina.it</li>
</ul>

<h2>Gruppo 1</h2>
<ul>
  <li>Iole Morabito - M63001448 - i.morabito@studenti.unina.it</li>
  <li>Marika Sasso - M63001438 - marik.sasso@studenti.unina.it</li>
  <li>Francesca Terracciano - M63001550 - francesca.terracciano@studenti.unina.it</li>
  <li>Doriana Traetto - M63001416 - d.traetto@studenti.unina.it</li>
</ul>

<h2>Task 2-3: Registrazione ed Autenticazione dei Giocatori</h2>
<p>
L'applicazione deve consentire agli studenti di registrarsi per poter conservare la storia delle attività svolte, oppure per accedere a requisiti di gioco più complessi. All'atto della registrazione, lo studente fornirà nome, cognome, un indirizzo e-mail valido e una password. Dopo aver controllato la validità dei dati forniti, il sistema aggiungerà il giocatore all'elenco dei giocatori registrati e gli assegnerà un ID univoco. Sarebbe desiderabile raccogliere anche altre informazioni sugli studenti, come il corso di studi a cui sono iscritti (Bachelor, Master Degree, o altro).
</p>
<p>
All'atto dell'autenticazione, lo studente fornirà l'indirizzo e-mail fornito per la registrazione e la relativa password. Dopo aver controllato la validità dei dati forniti, il sistema autenticherà il giocatore e gli fornirà una schermata per l'accesso alle funzionalità di gioco o di consultazione delle sessioni di gioco passate.
</p>

<h2>Deployment dell'applicazione</h2>
<ul>
  <li>Aprire Docker Desktop</li>
  <li>Aprire un terminale e posizionarsi nella cartella dov'è contenuto il progetto. Il comando <code>docker-compose up -d --build</code> viene utilizzato per avviare i servizi definiti in un file di configurazione <code>docker-compose.yml</code>. Viene, quindi, creata l’immagine del container ed eseguito il running.</li>
  <li>Per effettuare le richieste, aprire da browser le pagine tramite i path in locale (http://localhost:8080/register, http://localhost:8080/login, ecc.)</li>
  <li>Per visionare il popolamento delle tabelle del database, aprire un terminale ed eseguire i seguenti comandi:
    <ul>
      <li>Il comando <code>docker exec –it g1-t2t3-app-1 bash</code> viene utilizzato per entrare all'interno di un container Docker in esecuzione e avviare una shell interattiva al suo interno.</li>
      <li>Il comando <code>mysql –u root –p STUDENTSREPO</code> viene utilizzato per accedere all'interfaccia della riga di comando di MySQL e connettersi al database <code>STUDENTSREPO</code> utilizzando l'utente <code>root</code>. La password è <code>password</code>.</li>
      <li>Utilizzare i comandi SQL per la gestione delle tabelle (<code>SELECT</code>, <code>DROP</code>, <code>SHOW TABLES</code>, ecc.)</li>
    </ul>
  </li>
</ul>

<h2>Build nuove modifiche</h2>
<ol>
  <li>Lanciare il comando <code>mvn clean install</code> nella cartella contenente il progetto</li>
  <li>Lanciare la build dell'immagine: <code>docker compose up -d --build</code></li>
</ol>

## Nuovo Microservizio FastAPI per il Popolamento delle Tabelle di Storico Partite e Classifica Giocatori
Nel progetto complessivo, è stato integrato un nuovo microservizio basato su FastAPI dedicato al popolamento delle tabelle di storico delle partite e della classifica dei giocatori. Questo microservizio è puramente illustrativo, poiché le API originariamente disponibili non consentivano di recuperare tutti i dati necessari per popolare le suddette tabelle.
Al momento della modifica del database T4 (consultare il capitolo sulla proposta di modifica del database T4) e la creazione delle nuove API secondo lo schema Swagger API (consultare il capitolo sulle API), sarà possibile eliminare il microservizio FastAPI (eliminare il microservizio anche dall'<code>installer.bat</code>). Le nuove API potranno quindi sostituire il microservizio nelle pagine <code>ranking.js</code> (API classifica giocatori) e <code>history.js</code> (API storico partite).

# VIDEO DIMOSTRAZIONE

[![Video Dimostrazione](https://img.youtube.com/vi/SOm-hs1gaKo/0.jpg)](https://youtu.be/SOm-hs1gaKo)
