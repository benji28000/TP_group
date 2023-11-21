const express = require('express');
const http = require('http');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

const app = express();
const port = 8000;
const dbFilePath = path.join(__dirname, 'tasks.db');

// Déplacer la déclaration de db en dehors de la fonction asynchrone
let db;

(async () => {
  db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY,
      title TEXT
    );
  `);
})();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));





app.get('/display', async (req, res) => {
    
  try {
    const tasks = await db.all('SELECT * FROM tasks');
    res.render('index', { tasks });
  } catch (error) {

    console.error(error);
    res.status(500).send('Erreur interne du serveur');
  }


});

app.get('/add-task', (req, res) => {
    res.render('add-task');
});


app.post('/add-task', async (req, res) => {
  try {
    const { title } = req.body;
    await db.run('INSERT INTO tasks (title) VALUES (?)', title);
    res.redirect('/display');
  } catch (error) {

    console.error(error);
    res.status(500).send('Erreur interne du serveur');
  }
});

http.createServer(app).listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
