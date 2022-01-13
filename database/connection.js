const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "anuj1800SHAAN",
    database: "evstudio",
    multipleStatements: true,
    connectionLimit:100
    
});

module.exports = pool.promise();