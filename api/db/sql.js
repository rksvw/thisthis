const mysql = require("mysql");
require("dotenv").config();
const { promisify } = require("util");

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.PASS,
  database: process.env.DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL: ", err.stack);
    return;
  }
  console.log("Connected to MySQL as ID ", db.threadId);
});

// Promisify db.query() so you can use async/await
db.query = promisify(db.query).bind(db);

module.exports = {
  db,
};
