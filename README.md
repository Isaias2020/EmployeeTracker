
# MySQL: Employee Tracker

<p>
<a>
<img src="https://img.shields.io/badge/License-MIT-blueviolet"/></a>
</p>

## Description 

This application uses interfaces known as Content Management Systems.  This manages a company's departments, roles and employees using Node, Inquirer and MySQL.

## Table of Contents

* [Technologies](#Technologies)

* [Design](#Design)

* [License](#License)

* [Contributor](#Contributor)

* [Questions](#Questions)

## Technologies

Technologies used for this application.

  ```
  npm i mysql 
  npm i inquirer 
  npm i console.table
  ```

## Design

![Screenshot of working application](/Assets/Screenshot(EmployeeTracker).png)

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager

  Command-line application allows users to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

![SchemaPNG](/Assets/schema.png)

## License

MIT

## Contributor

Isaias Quintanilla

## Questions
Isaias2020
<br><br>
<img src="https://avatars.githubusercontent.com/u/59813695?" height="100" style="border-radius:50%">
<br><br>
If you have any questions please feel free to reach out to me at quintanillaisaias@gmail.com.

