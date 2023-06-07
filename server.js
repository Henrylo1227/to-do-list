const { InitDb } = require('./src/modules/database/DatabaseModule')

const { log } = require('console');
const express = require('express');

InitDb();
ServerStart();

function ServerStart() {
  //server setting
  const hostname = '127.0.0.1';
  const port = 3000;

  const app = express();
  const path = require('path');

  log(__dirname);
  // Set the static folder to serve HTML, CSS, and JavaScript files
  app.use(express.static(path.join(__dirname, 'public')));

  // Define routes for the different views
  app.get('/', (req, res) => {
    console.log('ServerStart: "GET/" request received...');
    const filePath = path.join(__dirname, 'public', 'dist', 'index.html');
    res.set({
      'Content-Type': 'text/html'
    })
    res.sendFile(filePath);
    console.log(`ServerStart: responsed file ${filePath}`);
  });

  app.get('/main.js', (req, res) => {
    console.log('ServerStart: "GET/main.js" request received...');
    const filePath = path.join(__dirname, 'public', 'dist', 'main.js'); // "./public/dist/main.js"
    res.set({
      'Content-Type': 'application/javascript'
    })
    res.sendFile(filePath);
    console.log(`ServerStart: responsed file ${filePath}`);
  });

  // Start the server
  app.listen(port, hostname, () => {
    console.log(`ServerStart: Server is running on http://${hostname}:${port}`);
  });
}