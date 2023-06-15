const sqlite3 = require('sqlite3');
const config = {
    server: {
        hostname: '127.0.0.1',
        port: '3000',
    },
    database: {
        path: './server/database/database.db',
        operationMode: sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE,
    }
}

module.exports = config;