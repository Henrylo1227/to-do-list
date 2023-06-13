const sqlite3 = require('sqlite3').verbose();
var Promise = require('promise');

const DatabaseModule = require("./DatabaseModule");

// specifiy the database path and mode option
const dbPath = './db/database.db';
const dbModeOptions = sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE;

module.exports = { InitDb, InsertSampleData, ExtractAllFromTable, InsertATask, RemoveATask }

async function InitDb() {
    let db;
    try{
        db = await DatabaseModule.createDbConnection();

        const sql = `create table if not exists TABLE_TASK (
            task_id char(4) primary key,
            check_state bool,
            description varchar(20));`;
        await db.run(sql);
        console.debug(`InitDb: Create TABLE_TASK susscessfully or it already exists`);
    } catch (error){
        console.error(`InitDb: Failed to initialize database: ${error.message}`);
        throw error;
    } finally {
        if (db) {
            CloseDbConnection(db);
        }
    }
}

async function ExtractAllFromTable (tableName) {
    let db;
    try {
        db = await CreateDbConnection();
        const sql = `SELECT * FROM ${tableName}`;
        const rows = await db.all(sql, (error, rows) => {
            // TODO
            // use Database module
        });

    } catch (error) {
        console.error(`ExtractAllFromTable: failed to perform query: ${error.message}`);
        throw error;
    } finally {
        if (db) {
            CloseDbConnection(db);
        }
    }
}

function InsertSampleData() {
    return new Promise( async(resolve, reject) => {
        await CreateDbConnection().then( (db) => {
            db.serialize(async() => {
                //create sample data
                await db.run('insert into TABLE_TASK values ("02", false, "demo description task1");');
                await db.run('insert into TABLE_TASK values ("12", false, "demo description task2");');
                await db.run('insert into TABLE_TASK values ("23", false, "demo description task3");');
                await db.run('insert into TABLE_TASK values ("34", false, "demo description task4");');

                db.close();
                console.log('InsertSampleData: database connection closed');
                console.log('InsertSampleData: Insertion completed');
                resolve();
            });
        }).catch((error) => {
            console.error(`InsertSampleData: db connection failed: ${error.message}`);
            reject(error);
            return;
        })
    });
}

function InsertATask(taskId, description){
    return new Promise((resolve, reject) => {
        CreateDbConnection().then(async (db) => {
            const sql = `insert into TABLE_TASK values ("${taskId}", false, "${description}");`;
            try{
                const dbPromise = await db.run(sql,
                    (error) =>{
                        if (error) {
                            console.error(`InsertATask: failed to insert a task ${error.message}`);
                            reject(error);
                            return;
                        }
                });
                resolve();
            } finally {
                console.log('InsertATask: database connection closed');
                db.close();
            }
        }).catch((error) => {
            console.error(`InsertATask: db connection faild: ${error.message}`);
            reject(error);
            return;
        });
    })
}

function RemoveATask(taskId){
    return new Promise((resolve, reject) => {
        CreateDbConnection().then( async (db) => {
            const sql = `delete from TABLE_TASK where task_id="${taskId}"`;
            try{
                const dbPromise = await db.run(sql,
                    (error) => {
                        if (error){
                            console.error(`RemoveATask: failed to remove a task ${error.message}`);
                            reject(error);
                            return;
                        }
                    });
                resolve();
            } finally {
                console.log('RemoveATask: database connection closed');
                db.close();
            }
        }).catch((error) => {
            console.error(`RemoveATask: db connection failed: ${error.message}`);
            reject(error);
            return;
        });
    })
}

function ToggleCheckStatesATask(taskId){
    return new Promise((resolve, reject) => {
        CreateDbConnection().then( async(db) =>{
        const sql = `update TABLE_TASK set check_state = case check_state when 0 then 1 when 1 then 0 else check_state`
            try{
                const dbPromise = await db.run(sql,
                    (error) => {
                        if (error){
                            console.error(`ToggleCheckStatesATask: failed to toggle task_state of taskId: ${taskId} ${error.message}`);
                            reject(error);
                            return;
                        }
                    });
                resolve();
            } finally {
                console.log('ToggleCheckStatesATask: database connection closed');
                db.close();
            }
        }).catch((error) => {
            console.error(`ToggleCheckStatesATask: db connection failed: ${error.message}`);
            reject(error);
            return;
        });
    });
}