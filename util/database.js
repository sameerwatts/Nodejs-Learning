const mySql = require('mysql2');

const pool = mySql.createPool({
    host: 'localhost',
    usename: 'root',
    database: 'node-complete',
    password: 'Ut8%thag',
});

module.exports = pool.promise();