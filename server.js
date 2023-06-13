const { DatabaseManager } = require('./src/modules/database/DatabaseManagerModule')

const sqlite3 = require('sqlite3');
const { log } = require('console');
const express = require('express');

// configs // TODO: Should be import from a config file

// server config 
const hostname = '127.0.0.1';
const port = 3000;


// database config
const dbPath = "./db/database.db";
const dbModeOption = sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE;


const database = new DatabaseManager(dbPath, dbModeOption);
database.initializeDatabase();
Server();

function Server() {

  const app = express();
  const path = require('path');

  log(__dirname);
  // Set the static folder to serve HTML, CSS, and JavaScript files
  app.use(express.static(path.join(__dirname, 'public')));

  // Define routes for the different views
  app.get('/', (req, res) => {
    console.log('Server: "GET/" request received...');
    const filePath = path.join(__dirname, 'public', 'dist', 'index.html');
    res.set({
      'Content-Type': 'text/html'
    })
    res.sendFile(filePath);
    console.log(`Server: responsed file ${filePath}`);
  });

  app.get('/main.js', (req, res) => {
    console.log('Server: "GET/main.js" request received...');
    const filePath = path.join(__dirname, 'public', 'dist', 'main.js'); // "./public/dist/main.js"
    res.set({
      'Content-Type': 'application/javascript'
    })
    res.sendFile(filePath);
    console.log(`Server: responsed file ${filePath}`);
  });

  app.get('/data/taskTable', async (req, res) => {
    console.log('Server: "GET/data/taskTable.js" request received...');
    const dataJson = await database.extractAllFromTable('TABLE_TASK');
    res.set({
      'Content-Type': 'application/json'
    })
    res.send(dataJson);
    console.log(`Server: responsed content: ${dataJson}`);
  });

  // Start the server
  app.listen(port, hostname, () => {
    console.log(`ServerStart: Server is running on http://${hostname}:${port}`);
  });
}