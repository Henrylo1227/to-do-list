
export function TestDb(){

const sqlite3 = require('../../node_modules/sqlite3');

const db = new sqlite3.Database('database.sqlite');

const sql = `
    CREATE TABLE IF NOT EXIST TASK_TABLE (
        task_id CHAR(4),
        check_status BOOLEAN,
        description VARCHAR(20)
    );
    `;

db.exec(sql);

sql = 'SELECT * FROM your_table';
db.all(sql, [], (err, rows) => {
  if (err) {
    console.error(err);
  } else {
    // Process the returned rows
    console.log(rows);
  }
});

db.close();
}