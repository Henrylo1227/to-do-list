const {ToDoDbManager} = require("./src/manager/ToDoDbManager");
const {DatabaseModule} = require("./utils/DatabaseModule");
const sqlite3 = require('sqlite3').verbose();

async function TestDb() {

    const sql = 'SELECT * FROM TABLE_TASK WHERE TASK_ID = "02"';
    const toDoDbManager = new ToDoDbManager();

}


TestDb();