const sqlite3 = require('sqlite3').verbose();

// specifiy the database path and mode option
const dbPath = './db/database.db';
const dbModeOptions = sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE;

exports.InitDB = () => {
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
                console.log(`InitDB: Create TABLE_TASK susscessfully`);
                resolve();
            });
            db.close();
            console.log('InitDB: database connection closed');
        });

    })
}

CreateDBConnection = () => {
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

exports.ExtractAllRecordFromDB = () => {
    return new Promise((resolve, reject) => {
        CreateDBConnection().then((db) => {
            db.all("select * from TABLE_TASK order by task_id",
                (error, rows) => {
                    if (error) {
                        console.error(`ExtractAllRecordFromDB: operation failed: ${error.message}`);
                        reject(error);
                        return;
                    }

                    rows.forEach(row => console.log(` 
                    task_id:${row.task_id}, 
                    check_status:${row.check_status}, 
                    description: ${row.description}`));
                    db.close();
                    console.log('ExtractAllRecordFromDB: database connection closed');
                    resolve();
                });
        }).catch((error) => {
            console.error(`ExtractAllRecordFromDB: database connection failed: ${error.message}`);
            reject(error);
        });
    });
}

exports.InsertSampleData = () => {
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
            console.error(`InserSampleData: db connection failed: ${error.message}`);
            reject(error);
            return;
        })
    });
}