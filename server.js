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
            "Add employee",
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

                case "Add roles":
                    addRole();
                    break;

                case "Remove Role":
                    removeRole();
                    break;

                case "View department":
                    viewDepartment();
                    break;

                case "Add department":
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

// function viewEmployee() {
//     inquirer.prompt({
//         name: "employee",
//         type: "input",
//         message: "What is the employee's first name?"
//     })
//         .then(function (answer) {
//             var query = "SELECT first_name last_name role_id manager_id FROM employee WHERE? ";
//             connection.query()
//         })
// }

function addDepartment() {
    inquirer.prompt({
        name: "Department",
        type: "input",
        message: "What is the name of the department?"
    })
        .then(function (answer) {
            connection.query("INSERT INTO department SET ?", {
                name: answer.Department
            })
            start()
        })
}

function addRole() {
    inquirer.prompt([{
        name: "title",
        type: "input",
        message: "What is the title of the role?"
    },
    {
        name: "salary",
        type: "input",
        message: "What is the salary?"
    },
    {
        name: "departmentId",
        type: "input",
        message: "What is the department id that the role belongs to?"
    }
    ])
        .then(function (answer) {
            connection.query("INSERT INTO role SET ?", {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.departmentId
            })
            start()
        })
}

function addEmployee() {
    inquirer.prompt([{
        name: "firstName",
        type: "input",
        message: "What is the Employee's first name?"
    },
    {
        name: "lastName",
        type: "input",
        message: "What is the Employee's last name?"
    },
    {
        name: "roleId",
        type: "input",
        message: "What is the id of the role for this employee?"
    },
    {
        name: "ManagerId",
        type: "input",
        message: "What is the id of the Manager for this employee?"
    }
    ])
        .then(function (answer) {
            connection.query("INSERT INTO employee SET ?", {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleId,
                manager_id: answer.ManagerId
            })
            start()
        })
}