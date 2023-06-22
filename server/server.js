const { ToDoDbManager } = require('./src/manager/ToDoDbManager')
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const { debug } = require('console');

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


  app.use(bodyParser.json());
  // static files 
  // index.html
  
  app.get('/', (req, res) => {
    const filePath = path.join(__dirname,'..', 'public','dist', 'index.html');
    res.set({
      'Content-Type': 'text/html'
    });
    res.sendFile(filePath);
  });

  // main.js
  app.get('/main.js', (req, res) => {
    const filePath = path.join(__dirname, '..','public', 'dist', 'main.js'); // "./public/dist/main.js"
    res.set({
      'Content-Type': 'application/javascript'
    });
    res.sendFile(filePath);
  });

  // favicon
  
  app.get('/favicon_to_do_list.ico', (req, res) => {
    const filePath = path.join(__dirname, '..','public','img', 'favicon_to_do_list.ico');
    res.set({
      'Content-Type': 'image/x-icon'
    });
    res.sendFile(filePath);
  });

  // to-do application
  // get all task 
  app.get('/todo/all-task', async (req, res) => {
    console.debug('Sever: "GET/todo/all-task" request received...');
    
    try {
      const dataJson = await toDoDbManager.getAllTask();
      res.set({
        'Content-Type': 'application/javascript'
      });
      res.send(dataJson);
    } catch (error) {
      res.set({
        'Content-Type': 'text/plain'
      });
      res.sendStatus(500);
    }
  });

  // post new task
  app.post('/todo/add-task', async (req, res) => {
    const payload = req.body;
    const newTaskDescription = payload.description;

    try {
      await toDoDbManager.insertATask(newTaskDescription);
      const resJson = {
        statusDescription: "A new task is added"
      }
      res.set({
        'Content-Type': 'application/json'
      });
      res.send(resJson);
    } catch (error){
      console.debug('server: '+ error);
      res.sendStatus(500);
    }
  })

  // delete a task
  app.post('/todo/remove-a-task', async (req, res) => {
    const payload = req.body;
    const taskId = payload.taskId;

    try {
      await toDoDbManager.removeATask(taskId);
      const resJson = { statusDescription: `Task ${taskId} is removed` }
      res.set({'Content-Type': 'application/json'});
      res.send(resJson);
    } catch (error) {
      console.debug('server: '+ error);
      res.sendStatus(500);
    }
  });

  // delete a list of task
  app.post('/todo/remove-a-list-of-task', async (req, res) => {
    const payload = req.body;
    const taskIdList = payload.taskIdList;

    try {
      await toDoDbManager.removeAListOfTask(taskIdList);
      const resJson = { statusDescription: `Task ${taskIdList.join(', ')} is removed` }
      res.set({'Content-Type': 'application/json'});
      res.send(resJson);
    } catch (error) {
      console.debug('server: '+ error);
      res.sendStatus(500);
    }
  });

  // Start the server
  app.listen(port, hostname, () => {
    console.log(`Server: Server is running on http://${hostname}:${port}`);
  });
}