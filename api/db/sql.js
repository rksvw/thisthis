const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.PASS,
  database: process.env.DB,
});

db.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL: ', err.stack);
        return;
    }
    console.log('Connected to MySQL as ID ', db.threadId);
});

module.exports = {
  db,
};
