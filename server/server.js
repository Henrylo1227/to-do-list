const { ToDoDbManager } = require('./src/manager/ToDoDbManager')
const config = require('./config');
const express = require('express');

// configs
// server
const hostname = config.server.hostname;
const port = config.server.port;
// database 
const dbPath = config.database.path;
const dbOperationMode = config.database.operationMode;

const toDoDbManager = new ToDoDbManager(dbPath, dbOperationMode);

toDoDbManager.initializeDatabase();
Server();

function Server() {

  const app = express();
  const path = require('path');

  app.use(express.static(path.join(__dirname, 'public')));  

  // root
  // index.html
  app.get('/', (req, res) => {
    console.debug('Server: "GET/" request received...');
    const filePath = path.join(__dirname,'..', 'public','dist', 'index.html');
    res.set({
      'Content-Type': 'text/html'
    });
    res.sendFile(filePath);
    console.debug(`Server: responsed file ${filePath}`);
  });
  // main.js
  app.get('/main.js', (req, res) => {
    console.log('Server: "GET/main.js" request received...');
    const filePath = path.join(__dirname, '..','public', 'dist', 'main.js'); // "./public/dist/main.js"
    res.set({
      'Content-Type': 'application/javascript'
    });
    res.sendFile(filePath);
    console.log(`Server: responsed file ${filePath}`);
  });

  // to-do application
  // get all task 
  app.get('/todo/all-task', async (req, res) => {
    console.debug('Sever: "GET/todo/all-task" request received...');
    const dataJson = await toDoDbManager.getAllTask();
    res.set({
      'Content-Type': 'application/javascript'
    });
    res.send(dataJson);
    console.debug(`Server: resposed content: ${dataJson}`);
  });

  // Start the server
  app.listen(port, hostname, () => {
    console.log(`Server: Server is running on http://${hostname}:${port}`);
  });
}