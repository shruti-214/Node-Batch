const mysql = require('mysql2/promise');
// const dotenv = require('dotenv');

// dotenv.config({ path: '../config.env' });

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: `${process.env.SQL_DB_USER}`,
//     password: `${process.env.SQL_DB_PASSWORD}`,
//     database: 'test'
// });

exports.getConnection = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sbhadani',
        database: 'test'
    });
    return connection;
}
