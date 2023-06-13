const sqlite3 = require('sqlite3').verbose();
var Promise = require('promise');

// Database config
const dbPath = './db/database.db';
const dbModeOptions = sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE;

// SQL mode
const RUN = 1;
const GET = 2;
const ALL = 3;

module.exports = { executeDbQuery, ALL, RUN, GET}

function createDbConnection () {
    // create a database connection with the configuration
    // return a promise, it contains a sqlite3 database object to perform other the database operation
    
    return new Promise( (resolve, reject) => {
        const database = new sqlite3.Database(
            dbPath,
            dbModeOptions,
            // error handling: cannot connect to database
            (error) => {
                if (error) {
                    console.error(`createDbConnection: connection failed: ${error.message}`);
                    reject(error);
                    return;
                }
            }
        );
        // successfully connection to database
        console.debug(`createDbConnection: open database connection`);
        resolve(database);
    })
}

function closeDbConnection(database) {
    // close an exsiting datbase connection
    database.close();
    console.debug(`closeDbConnection: close database conection`)
}

async function executeDbQuery(mode, sql) {
    // execute SQL under sqlite3, support 3 modes: RUN, GET and ALL,
    let queryResult;
    const db = await createDbConnection().then( async (database)=>{
        try {
            // for operation with no return record such as INSERT / DELETE
            if (mode == RUN){
                return new Promise( async (resolve, reject) => {
                    await database.run(sql, (error) => {
                        if (error) {
                            console.error(`executeDbQuery: failed to execute: \t${sql}\t${error.message}`);
                            reject(error);
                            return;
                        }
                        resolve();
                    })
                });
            }
            
            // for operation have single return record such as SELECT
            if (mode == GET){
                return new Promise( async (resolve, reject) => {
                    await database.get(sql, (error, row) => {
                        if (error) {
                            console.error(`executeDbQuery: failed to execute: \t${sql}\t${error.message}`);
                            reject(error);
                            return;
                        }
                        resolve(row);
                    });
                });
            }
    
            // for operation with mutilple return records such as SELECT *
            if (mode == ALL){
                return new Promise( async (resolve, reject) => {
                    await database.all(sql, (error, rows) => {
                        if (error) {
                            console.error(`executeDbQuery: failed to execute: \t${sql}\t${error.message}`);
                            reject(error);
                            return;
                        }
                        resolve(rows);
                    });
                });    
            }
            throw new Error(`unsupported mode: ${mode}, not in {RUN, GET, ALL}`);
        } catch (error) {
            console.error(`executeDbQuery: ${error.message}`);
            return;
        } finally {
            closeDbConnection(database);
        }
    }).then((result)=>{
        // only for sql that has a result
        queryResult = result;
    });

    return queryResult;
}
    
    




