const {InitDB} = require('./src/modules/database/DatabaseModule');
const {TableInit} = require('./src/modules/taskTable/TaskTableModule');

InitDB();
TableInit();