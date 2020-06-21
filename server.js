const inquirer = require("inquirer");
const mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employeetracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

const start = () => console.log("Test")