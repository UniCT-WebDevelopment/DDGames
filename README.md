# DDGames
DDGames è un sito giochi nel quale ogni utente può registrarsi, inserire il proprio gioco realizzato in p5js e può anche recensire altri giochi. Ogni gioco inserito viene smistato in una delle categorie presenti.
L'utente amministratore ha accesso ad un pannello amministrativo che permette di effettuare operazioni non concesse agli altri utenti.

## Ulteriori informazioni:
Per la realizzazione del progetto sono state utilizzate le seguenti tecnologie:
- HTML
- CSS
- Javascript
- JQuery
- p5js
- NodeJS
- ExpressJS
- Phpmyadmin (MySQL)

## Requisiti:
Prima di proseguire è necessario installare:
- NodeJS da questo link https://nodejs.org/en/download
- XAMPP e selezionare l'installazione di Apache e MySQL

## Configurazione:
### Pre-avvio:
Settare il database come segue: 
- aprire XAMPP eseguendolo come amministratore
- avviare Apache e MySQL
- dopo averli avviati, sempre sul pannello di XAMPP, cliccare su "Admin" nella sezione "Actions" di MySQL (si aprirà una pagina web)
- creare un nuovo utente, fornendo i permessi globali e come host inserire "localhost", inserire poi nome utente e password (che andranno inseriti successivamente su app.js)
- creare un nuovo database, inserendo il nome desiderato (che poi andrà inserito sempre su app.js)
- importare il file ddgames.sql
  
Nel file app.js bisogna configurare:
- database (r. 156-159): sostituire "user" con il nome utente di phpmyadmin, "password" con la password dell'utente di phpmyadmin e "ddgames" con il nome del database creato su phpmyadmin
- admin (r. 132): per poter impostare un utente come amministratore bisogna sostituire "1" con l'id (dal database) dell'utente che deve essere admin

### Avvio:
- aprire il terminale di VSCode con CTRL+SHIFT+ò
- avviare il server con il comando ```node .\app.js```
- aprire il browser e digitare http://localhost:8080/ nella barra di ricerca
