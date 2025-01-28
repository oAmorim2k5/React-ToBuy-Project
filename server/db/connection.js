const mysql = require("mysql");

const db = mysql.createPool({
    hostname: "localhost",
    user: "root",
    password: "!008976Vvt",
    database: "tobuy",
});

module.exports = db;
