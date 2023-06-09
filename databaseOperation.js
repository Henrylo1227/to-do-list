const {InitDb, ExtractAllFromTable, InsertSampleData, InsertATask} = require('./src/modules/database/DatabaseModule');


async function FromDb(){
    var result = await ExtractAllFromTable("TABLE_TASK");
    console.log(result);
}

FromDb();