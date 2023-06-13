<<<<<<< HEAD
<<<<<<< HEAD
const {DatabaseManager} = require("./back-end/databaseModule/DatabaseManagerModule");
const sqlite3 = require('sqlite3').verbose();

=======
const DatabaseModule = require("./src/modules/database/DatabaseModule");
>>>>>>> parent of c827ac5 (Implemented DatabaseManagerModule)
=======
const DatabaseModule = require("./src/modules/database/DatabaseModule");
>>>>>>> parent of c827ac5 (Implemented DatabaseManagerModule)

async function TestDb() {

    const sql = 'SELECT * FROM TABLE_TASK WHERE TASK_ID = "02"';

    const queryResult = await DatabaseModule.executeDbQuery(DatabaseModule.GET, sql);
    console.log(queryResult);
}
TestDb();