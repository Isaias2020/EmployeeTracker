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

function start() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "View all employees by department",
            "View all employees by manager",
            "Add employee",
            "Remove employee",
            "Update employee role",
            "Update employee manager",
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
                case "View all employees":
                    viewEmployee();
                    break;

                case "View all employees by department":
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

                case "Update employee role":
                    updateEmployee();
                    break;

                case "Update employee manager":
                    updateManager();
                    break;

                case "View Roles":
                    viewRole();
                    break;

                case "Add roles":
                    addRole();
                    break;

                case "Remove role":
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

// Add Department
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

// Add Role
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

// Add employee
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
            },
                function (err, answer) {
                    if (err) {
                        throw err;
                    }
                }
            );
            start()
        });
}

// View ALL departments
function viewDepartment() {
    connection.query("SELECT * FROM department", function (err, answer) {
        console.log("\n Departments Retrieved from Database \n");
        console.table(answer);
    });
    start();
}

// View ALL roles
function viewRole() {
    connection.query("SELECT * FROM role", function (err, answer) {
        console.log("\n Roles Retrieved from Database \n");
        console.table(answer);
    });
    start();
}

// View ALL employees
function viewEmployee() {
    console.log("Retrieving employees from database");
    var infoQuery =
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;";
    connection.query(infoQuery, function (err, answer) {
        console.log("\n Employees retrieved from Database \n");
        console.table(answer);
    });
    start();
}

// Update Employee Role
function updateEmployee() {
    let allemployees = [];
    connection.query("SELECT * FROM employee", function (err, answer) {
        for (let i = 0; i < answer.length; i++) {
            let employeeString =
                answer[i].id + " " + answer[i].first_name + " " + answer[i].last_name;
            allemployees.push(employeeString);
        }
        inquirer.prompt([{
            name: "updateEmployee",
            type: "list",
            message: "Select employee to update role",
            choices: allemployees
        },
        {
            name: "newrole",
            type: "list",
            message: "Please select new role",
            choices: ["manager", "employee"],
        }
        ])
            .then(function (answer) {
                console.log("about to update", answer);
                const updateID = {};
                updateID.employeeId = parseInt(answer.updateEmployee.split(" ")[0]);
                if (answer.newrole === "manager") {
                    updateID.role_id = 1;
                } else if (answer.newrole === "employee") {
                    updateID.role_id = 2;
                }
                connection.query("UPDATE employee SET role_id = ? WHERE id = ?",
                    [updateID.role_id, updateID.employeeId],
                    function (err, data) {
                        start();
                    }
                );
            });
    });
}