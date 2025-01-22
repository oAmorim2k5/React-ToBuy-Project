const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "!008976Vvt",
    database: "tobuy",
})

app.listen(8800, () => {
    console.log("Rodando na porta 8800");
})