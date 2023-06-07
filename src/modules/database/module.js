const sqlite3 = require('sqlite3').verbose();

// specifiy the database path and mode option
const dbPath = './db/database.db';
const dbModeOptions = sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE;

exports.CreateDBConnection = () => {
    // Create a new database connection
    const db = new sqlite3.Database(
        dbPath,
        dbModeOptions, 
        (error) => {
            if (error) {
                console.error(`CreateDBConnection: connection failed: ${error.msg}`);
                return;
            }
    });
    console.log('database opened successfully');

    // Create table if the table is not exist
    try {
        let sql
        //create TABLE_TASK            
        sql=`create table if not exists TABLE_TASK (
                    task_id char(4) primary key,
                    check_status bool,
                    description varchar(20));`;
        db.run(sql, (error) => {
            if (error) return console.error(`CreateDBConnection: create table failed: ${error.msg}`);
        });
    } catch(error){
        console.error(error);
    } finally {
        db.close();
    }
}

exports.ExtractAllRecordFromDB = () => { 
    const db = new sqlite3.Database(
        dbPath, 
        dbModeOptions,
        (error) => {
        if (error) {
            console.error(`ExtractAllRecordFromDB: operation failed: ${error.message}`);
            return; 
        }    
    });
    try {
        db.all("select * from TABLE_TASK order by task_id",
        (error, rows) => {
            rows.forEach( row => console.log(` 
                                                task_id:${row.task_id}, 
                                                check_status:${row.check_status}, 
                                                description: ${row.description}`))
            
        });
    } catch(error){
        console.error(error);
    } finally {
        db.close();
    }
}

exports.InsertSampleData = () => {
    const db = new sqlite3.Database(
        dbPath,
        dbModeOptions,
        (error) => {
            if (error) {
                console.error(`ExtractAllRecordFromDB: operation failed: ${error.message}`);
                return; 
            }    
        });
    try{
        //create sample data
        db.run('insert into TABLE_TASK values ("0", false, "demo description task1");');
        db.run('insert into TABLE_TASK values ("1", false, "demo description task2");');
        db.run('insert into TABLE_TASK values ("2", false, "demo description task3");');
        db.run('insert into TABLE_TASK values ("3", false, "demo description task4");');
    } catch (error) {
        console.error(`InsertSampleData: Insertion failed: ${error.message}`);
    } finally {
        db.close();
    }
    console.log('InsertSampleData: Insertion completed');
}