const DatabaseModule = require("./src/modules/database/DatabaseModule");

async function TestDb() {

    const sql = 'SELECT * FROM TABLE_TASK WHERE TASK_ID = "02"';

    const queryResult = await DatabaseModule.executeDbQuery(DatabaseModule.GET, sql);
    console.log(queryResult);
}
TestDb();