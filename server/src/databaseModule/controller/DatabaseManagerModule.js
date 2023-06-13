const sqlite3 = require('sqlite3').verbose();
var Promise = require('promise');

const DatabaseModule = require("../model/DatabaseModule");

// specifiy the database path and mode option
const dbPath = './db/database.db';
const dbModeOptions = sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE;

class DatabaseManager {
    constructor(dbPath, dbModeOptions){
        this.database = new DatabaseModule.sqlite3DatabaseConnection(dbPath, dbModeOptions);
    }

    async initializeDatabase() {
        // configure database
        // create table if not exist
        const sql = `CREATE TABLE IF NOT EXISTS TABLE_TASK (
            task_id         CHAR(4)     PRIMARY KEY,
            check_state     BOOL,
            description     VARCHAR(20));`;
        await this.database.executeQuery(DatabaseModule.RUN, sql);
        console.debug('Database initialized successfully.')
    }

    async extractAllFromTable(tableName) {
        // configure database
        const sql = `SELECT * FROM ${tableName};`
        const queryResult = await this.database.executeQuery(DatabaseModule.ALL, sql);
        console.debug(`extractAllFromTable: query result: ${queryResult}`);
        return queryResult;
    }

    async insertSampleData() {
        //create sample data
        const sqlList = [
            'insert into TABLE_TASK values ("02", false, "demo description task1");',
            'insert into TABLE_TASK values ("12", false, "demo description task2");',
            'insert into TABLE_TASK values ("23", false, "demo description task3");',
            'insert into TABLE_TASK values ("34", false, "demo description task4");'
        ];
        sqlList.forEach( async (sql) =>{
            await this.database.executeQuery(DatabaseModule.RUN, sql);
        })
        console.debug('insertSampleData: Insertion completed');
    }

    async insertATask(taskId, description){
        const sql = `insert into TABLE_TASK values ("${taskId}", false, "${description}");`;
        await this.database.executeQuery(DatabaseModule.RUN, sql);
        console.debug('insertATask: Insertion completed');
    }

    async removeATask(taskId){
        const sql = `delete from TABLE_TASK where task_id="${taskId}"`;
        await this.database.executeQuery(DatabaseModule.RUN, sql);
        console.debug(`removeATask: task taskId: ${taskId} is removed`);
    }

    async toggleCheckStateATask(taskId){
        const sql = `update TABLE_TASK 
        set check_state = case 
                            check_state 
                            when 0 then 1 
                            when 1 then 0 
                            else check_state
                            end `
        await this.database(DatabaseModule.RUN, sql);
    }
}


module.exports = {DatabaseManager}