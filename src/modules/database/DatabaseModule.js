const sqlite3 = require('sqlite3').verbose();
var Promise = require('promise');
const { Database } = require('sqlite3');

// specifiy the database path and mode option
const dbPath = './db/database.db';
const dbModeOptions = sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE;

module.exports = { InitDb, InsertSampleData, ExtractAllFromTable, InsertATask }

function InitDb() {
    return new Promise((resolve, reject) => {
        CreateDBConnection().then((db) => {
            // Create table if the table is not exist
            let sql
            //create TABLE_TASK            
            sql = `create table if not exists TABLE_TASK (
                    task_id char(4) primary key,
                    check_status bool,
                    description varchar(20));`;
            db.run(sql, (error) => {
                if (error) {
                    console.error(`CreateDBConnection: create table failed: ${error.msg}`);
                    reject(error);
                    return;
                }
                console.log(`InitDb: Create TABLE_TASK susscessfully or it already exists`);
                resolve();
            });
            db.close();
            console.log('InitDb: database connection closed');
        });

    });
}

function CreateDBConnection() {
    return new Promise((resolve, reject) => {
        // Create a new database connection
        const db = new sqlite3.Database(
            dbPath,
            dbModeOptions,
            (error) => {
                if (error) {
                    console.error(`CreateDBConnection: connection failed: ${error.message}`);
                    reject(error);
                    return;
                }
            });
        console.log('CreateDBConnection: database opened successfully');
        resolve(db);
    });
}

function ExtractAllFromTable (tableName) {
    return new Promise((resolve, reject) => {
        CreateDBConnection().then((db) => {
            db.all(`select * from ${tableName}`,
                (error, rows) => {
                    if (error) {
                        console.error(`ExtractAllRecordFromDB: operation failed: ${error.message}`);
                        reject(error);
                        return;
                    }
                    db.close();
                    console.log('ExtractAllFromTable: database connection closed');
                    resolve(rows);
                });
        }).catch((error) => {
            console.error(`ExtractAllFromTable: database connection failed: ${error.message}`);
            reject(error);
        });
    });
}

function InsertSampleData() {
    return new Promise((resolve, reject) => {

        CreateDBConnection().then((db) => {
            db.serialize(() => {
                //create sample data
                db.run('insert into TABLE_TASK values ("02", false, "demo description task1");');
                db.run('insert into TABLE_TASK values ("12", false, "demo description task2");');
                db.run('insert into TABLE_TASK values ("23", false, "demo description task3");');
                db.run('insert into TABLE_TASK values ("34", false, "demo description task4");');

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
        CreateDBConnection().then((db) => {
            const sql = `insert into TABLE_TASK values ("${taskId}", false, "${description}");`;
            try{
                db.run(sql,
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
            console.error(`InsertATas: db connection faild: ${error.message}`);
            reject(error);
            return;
        });
    })
}
