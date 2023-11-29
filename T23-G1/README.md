<h1> Testing Game </h1>
<h2> Gruppo A2 </h2>
<li>Antonio Paolino M63001394 antoni.paolino@studenti.unina.it </li>
<li>Alberto Arola M63001438 marik.sasso@studenti.unina.it </li>
<li>Alfonso Esposito M63001406 alfonso.esposito17@studenti.unina.it </li>

<h2> Gruppo 1 </h2>
<li>Iole Morabito M63001448 i.morabito@studenti.unina.it </li>
<li> Marika Sasso M63001438 marik.sasso@studenti.unina.it </li>
<li> Francesca Terracciano M63001550 francesca.terracciano@studenti.unina.it </li>
<li> Doriana Traetto M63001416 d.traetto@studenti.unina.it </li>

<h2>  Task 2-3: Registrazione ed Autenticazione dei Giocatori </h2>
L'applicazione deve consentire agli studenti di registrarsi per poter conservare la storia delle attività svolte, oppure per accedere a requisiti di gioco più complessi. All'atto della registrazione, lo studente fornirà nome, cognome, un indirizzo e-mail valido ed una password, il sistema dopo aver controllato la validità dei dati forniti, aggiungerà il giocatore all'elenco dei giocatori registrati e gli assocerà un ID univoco. Sarebbe desiderabile raccogliere anche altre informazioni sugli studenti, come il corso di studi a cui sono iscritti (Bachelor, Master Degree, o altro).
All'atto della autenticazione, lo studente fornirà l'indirizzo e-mail fornito per la registrazione e la relativa password, il sistema dopo aver controllato la validità dei dati forniti, autenticherà il giocatore e gli fornirà una schermata per l'accesso alle funzionalità di gioco o di consultazione delle sessioni di gioco passate.

<h2> Deployment dell'applicazione </h2>
<li>Aprire Docker Desktop</li>
<li>Aprire un terminale da amministratore e posizionarsi sul percorso dove è contenuto il progetto
	<code>docker-compose up</code> viene utilizzato per avviare i servizi definiti in un file di configurazione <code>docker-compose.yml</code>. Viene creata l’immagine del container e viene eseguito il running.</li>
<li>Per effettuare le richieste, aprire da browser le pagine tramite i path in locale (http://localhost:8080/register, http://localhost:8080/login, ecc.) </li>
<li>Per visionare il popolamento delle tabelle del database, aprire un terminale ed eseguire i seguenti comandi:  
	<code>docker exec –it g1-t2t3-app-1 bash</code> viene utilizzato per entrare all'interno di un container Docker in esecuzione e avviare una shell interattiva al suo interno. 
	<code>mysql –u root –p STUDENTSREPO</code>: viene utilizzato per accedere all'interfaccia della riga di comando di MySQL e connettersi al database <code>STUDENTSREPO</code> utilizzando l'utente <code>root</code> e richiedendo la password <code>password</code>. </li>
<li>Utilizzare i comandi SQL per la gestione delle tabelle (<code>SELECT</code>, <code>DROP</code>, <code>SHOW TABLES </code>, ecc.) </li>

<h2> Build nuove modifiche </h2>
<li>1. Lanciare il comando `mvn clean install`</li>
<li>2. Rimuovere il container `t23-g1-app-1` </li>
<li>3. Lanciare la build dell'immagine: `docker compose up -d --build`</li>

