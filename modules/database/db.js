// database
import sqlite3InitModule from '../../node_modules/@sqlite.org/sqlite-wasm/sqlite-wasm/jswasm/sqlite3.mjs';


const log = (...arg) => console.log(...arg);
const error = (...arg) => console.error(...arg);

const start = function (sqlite3) {
  log('Running SQLite3 version', sqlite3.version.libVersion);
  const db = new sqlite3.oo1.JsStorageDb('local');
  // Your SQLite code here.
  
}

function DbInit() {

    console.log('db module loaded');

    log('Loading and initializing SQLite3 module...');
    sqlite3InitModule({
        print: log,
        printErr: error,
    }).then((sqlite3) => {
        try {
            log('Done initializing. Running demo...');
            start(sqlite3);
        } catch (err) {
            error(err.name, err.message);
        }
    });
}

function CreateTaskTable() {

}

function RemoveATaskFromTable(taskId, table) {

}

function AddATaskToTable(taskId, table) {

}

export { DbInit };