const express = require('express');
const { DatabaseManager } = require('./DatabaseManagerModule')

// database
const dbPath = "./db/database"
const databaseManager = new DatabaseManager()
// server

InitDb();
Server();

function Server() {
  //server setting
  const hostname = '127.0.0.1';
  const port = 3000;

  const app = express();
  const path = require('path');

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
    const dataJson = await ExtractAllFromTable('TABLE_TASK');
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