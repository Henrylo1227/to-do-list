const {DatabaseManager} = require("./src/modules/database/DatabaseManagerModule");
const sqlite3 = require('sqlite3').verbose();


async function TestDb() {

    const dbPath = './db/database.db';
    const dbModeOptions = sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE;

    const dbManager = new DatabaseManager(dbPath, dbModeOptions);
    dbManager.initializeDatabase();
}
TestDb();