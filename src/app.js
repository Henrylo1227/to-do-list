const {TableInit} = require('./modules/taskTable/TaskTableModule');
const axios = require('./../node_modules/axios/dist/browser/axios.cjs');

// Make request to fetch data taskTable
axios('/data/taskTable');


// User Interface
TableInit();