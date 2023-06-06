const sqlite3 = require('sqlite3');


export const CreateDBConnection = () => {

    const db = new sqlite3.oo1.DB();
    try {
        db.exec([
            `
            create table if not exists TABLE_TASK (
                task_id char(4),
                check_status bool,
        description varchar(20));
        `,
        `
        insert into TABLE_TASK values (
            '0', 
            false, 
            'demo description');`
        ]);
    } catch(error){
        console.error(error);
    } finally {
        db.close();
    }
}

export const ExtractRecordFromDB = () => { 

    const db = new sqlite3.oo1.DB();
    try {
        db.exec([
            `
            select * from TASK_TABLE where task_id = '0';
            `,
        ]);
    } catch(error){
        console.error(error);
    } finally {
        db.close();
    }
}
