const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    
    user:'root',
    password: '',
    database:'modulodiagnosticador'
});

pool.query = util.promisify(pool.query);
module.exports = pool;