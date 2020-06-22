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

// const start = () => console.log("Test")
function start() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all employees?",
            "View all employees by department?",
            "View all employees by manager?",
            "Add employee?",
            "Remove employee?",
            "Update employee role?",
            "Update employee manager?",
            "View Roles",
            "Add roles",
            "Remove role",
            "View department",
            "Add department",
            "Remove department",
            "View the total utilized budget of a department",
            "Exit"
        ]
    })
        .then(function (answer) {
            switch (answer.action) {
                case "View all Employees":
                    viewEmployee();
                    break;

                case "View all Employees by department":
                    viewEmpDepartment();
                    break;

                case "View all employees by manager":
                    viewEmpManager();
                    break;

                case "Add employee":
                    addEmployee();
                    break;

                case "Remove employee":
                    removeEmployee();
                    break;

                case "Update employee's role":
                    updateEmployee();
                    break;

                case "Update employee's manager":
                    updateManager();
                    break;

                case "View Roles":
                    viewRole();
                    break;

                case "Add Roles":
                    addRole();
                    break;

                case "Remove Role":
                    removeRole();
                    break;

                case "View department":
                    viewDepartment();
                    break;

                case "Add Department":
                    addDepartment();
                    break;

                case "Remove Department":
                    removeDepartment();
                    break;

                case "View the total utilized budget of a department":
                    viewBudget();
                    break;

                case "Exit":
                    connection.end();
                    break;
            };
        });
};

function viewEmployee() {

}