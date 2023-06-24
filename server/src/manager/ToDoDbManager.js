const sqlite3 = require('sqlite3').verbose();
var Promise = require('promise');

const DatabaseModule = require("../../utils/DatabaseModule");

class ToDoDbManager {

    constructor(dbPath, dbModeOptions){
        this.database = new DatabaseModule.sqlite3DatabaseConnection(dbPath, dbModeOptions);
    }

    async initializeDatabase() {
        // configure database
        // create table if not exist
        const sql = `
            CREATE TABLE IF NOT EXISTS TABLE_TASK (
            task_id         INTEGER     PRIMARY KEY     AUTOINCREMENT,
            check_state     BOOL,
            description     VARCHAR(20));
            `;
        await this.database.executeQuery(DatabaseModule.RUN, sql);
        console.debug('Database initialized successfully.')
    }

    async getAllTask() {
        // configure database
        const sql = `SELECT * FROM TABLE_TASK;`
        const queryResult = await this.database.executeQuery(DatabaseModule.ALL, sql);
        console.debug(`extractAllFromTable: query result: ${queryResult}`);
        return queryResult;
    }

    async insertSampleData() {
        // insert sample tasks to the database
        //create sample data
        const sqlList = [
            'insert into TABLE_TASK (Check_state, description) values (false, "demo description task1");',
            'insert into TABLE_TASK (Check_state, description) values (false, "demo description task2");',
            'insert into TABLE_TASK (Check_state, description) values (false, "demo description task3");',
            'insert into TABLE_TASK (Check_state, description) values (False, "demo description task4");'
        ];
        sqlList.forEach( async (sql) =>{
            await this.database.executeQuery(DatabaseModule.RUN, sql);
        })
        console.debug('insertSampleData: Insertion completed');
    }

    async insertATask(description){
        const sql = `insert into TABLE_TASK (Check_state, description) values (false, "${description}");`;
        const id = await this.database.insertTaskSQL(sql);
        console.debug('insertATask: Insertion completed');
        return id;
    }

    async getLastInsertRowId(){
        const sql = `SELECT last_insert_rowid();`
        const lastestId = await this.database.executeQuery(DatabaseModule.GET, sql);
        console.debug(`last_insert_rowid(): ${lastestId}`);
        return lastestId;
    }

    async removeATask(taskId){
        const sql = `delete from TABLE_TASK where task_id =${taskId};`;
        await this.database.executeQuery(DatabaseModule.RUN, sql);
        console.debug(`removeATask: task taskId: ${taskId} is removed`);
    }

    async removeAListOfTask(taskIdList){
        const sqlEnd = taskIdList.join(' or ');
        const sql = `delete from TABLE_TASK where task_id = ${sqlEnd};`;
        await this.database.executeQuery(DatabaseModule.RUN, sql);
        console.debug(`removeAListOfTask: task taskId: ${taskIdList.join(', ')} are checked`);
    }

    async checkAListOfTask(taskIdList){
        const sqlEnd = taskIdList.join(' or ');
        const sql = `update TABLE_TASK set check_state = true where task_id = ${sqlEnd};`;
        await this.database.executeQuery(DatabaseModule.RUN, sql);
        console.debug(`checkAListOfTask: task taskId: ${taskIdList.join(', ')} are checked`);
    }

    async uncheckAListOfTask(taskIdList){
        const sqlEnd = taskIdList.join(' or ');
        const sql = `update TABLE_TASK set check_state = false where task_id = ${sqlEnd};`;
        await this.database.executeQuery(DatabaseModule.RUN, sql);
        console.debug(`checkAListOfTask: task taskId: ${taskIdList.join(', ')} are unchecked`);
    }

    async toggleCheckStateATask(taskId){
        const sql = `update TABLE_TASK 
        set check_state = case 
                            check_state 
                            when 0 then 1 
                            when 1 then 0 
                            else check_state
                            end 
                            where task_id = ${taskId}`
        await this.database.executeQuery(DatabaseModule.RUN, sql);
    }
}


module.exports = {ToDoDbManager}