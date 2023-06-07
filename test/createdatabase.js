const { CreateDBConnection, ExtractRecordFromDB } = require('../src/modules/database/module');

var assert = require('assert');


describe('Database module', function (){
    describe('#CreateDBConnection(): ', function () {
        it('dabase creation and insertion', function() {
            CreateDBConnection();
            var temp = ExtractRecordFromDB();
            assert.equal([1, 2, 3].indexOf(4), -2);
        });
    });
});
//test sample