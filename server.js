const { log } = require('console');
const express = require('express');

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
  res.sendFile(path.join(__dirname, 'public','dist', 'index.html'));
});

app.get('/main.js', (req, res) => {
    res.set({'Content-Type': ''})
    res.sendFile(path.join(__dirname, 'public','dist', 'main.js'));
  });

// Start the server
app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
