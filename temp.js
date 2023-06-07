const { CreateDBConnection, InsertSampleData, ExtractAllRecordFromDB} = require('./src/modules/database/module.js');


function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

CreateDBConnection();

sleep(100);

InsertSampleData();

sleep(100);
ExtractAllRecordFromDB();