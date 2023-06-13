const {DatabaseManager} = require("./src/modules/database/DatabaseManagerModule");
const sqlite3 = require('sqlite3').verbose();

async function TestDb() {

    const sql = 'SELECT * FROM TABLE_TASK WHERE TASK_ID = "02"';

    const queryResult = await DatabaseModule.executeDbQuery(DatabaseModule.GET, sql);
    console.log(queryResult);
}
TestDb();