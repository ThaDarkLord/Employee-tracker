const mysql = require('mysql2');
const inquirer = require('inquirer')

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    password: 'password123',
    database: 'employee_db'
  },
  console.log(`Connected to the recruiter_db database.`)
);

const startQuestion = [
  {
    type: 'list',
    name: 'answer',
    message: 'What would you like to do?',
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Departments']
  },
]

inquirer.prompt(startQuestion)
  .then((data) => {

    console.log(data);
    // view all employees
    if (data.answer === 'View All Employees') {
      db.query(`SELECT * FROM employee`, (err, results) => {
        if (err) {
          console.log(err)
        } else {
          console.table(results)
        }
      })
    }
    // add an employee
  
    else if (data.answer === 'Add Employee') {
      inquirer
        .prompt([
          {
            name: 'firstname',
            type: 'input',
            message: 'What is the employees first name ?'
          },
          {
            name: 'lastname',
            type: 'input',
            message: 'What is the employees last name ?'

          },
          {
            name: 'roleId',
            type: 'list',
            message: 'What is the employees role ?',
            choices: [{name:'Sales Lead', value: 1},{name:'Lead Engineer', value: 2}, {name:'Account Manager', value: 3}, {name: 'Legal Team Lead', value: 4}]

          },
          {
            name: 'managerId',
            type: 'list',
            message: 'What is the employee mananger id?',
            choices: [{name: 'Chad Brunswick', value: 1},{name:'Brett Brunswick', value: 2}]
          }
        ]).then((promptData) => {
          let userInput1 = promptData.firstname;
          let userInput2 = promptData.lastname;
          let userInput3 = promptData.roleId;
          let userInput4 = promptData.managerId;
          db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`, [userInput1,userInput2,userInput3,userInput4], (err, results) => {
            if (err) {
              console.log(err)
            } else {
              console.log('Employee successfully added');
            }
          })
        })
    }
   
  // update employee role
    else if( data.answer === 'Update Employee Role'){
      inquirer.prompt([
        {
          name: 'title',
          message: 'What is the new title of the employee?',
          type: 'list',
          choices: [{name: 'Sales Lead', value: 1}, {name: 'Engineering Lead', value: 2}, {name: 'Financial Lead', value: 3},{name: 'Legality Lead', value: 4},{name: 'Sales team member', value: 5}, {name: 'Engineering team member', value: 6}, {name: 'Financial team member', value: 7}, {name: 'Legality team member', value: 8}]
        },
        {
          name: 'salary',
          message: 'What is the salary for this role?',
          type: 'list',
          choices: ['80000', '90000', '100000', '150000', '250000']

        }
      ]).then((roleData) => {
      let input1 = roleData.title;
      let input2 = roleData.salary;
      db.query('UPDATE role SET(title, salary) VALUES(?,?)', [input1, input2],(err, results) => {
        if(err){
          console.log(err)
        } else {
          console.log('Employee role has successfuly been updated')
        }
      })
    })
    }
    // views all the roles
    else if (data.answer === 'View All Roles'){
      db.query('SELECT * FROM role' , (err, results) => {
        if (err){
          console.log(err)
        } else{
          console.table(results)
        }
      })
    }
    // // add a role
    else if(data.answer === 'Add Role'){
      inquirer
      .prompt([
        {
          name: 'role',
          message: 'What is the role that you would like added?',
          type: 'input'
        },
        {
          name: 'departmentId',
          message: 'What is the department ID for this role?',
          type: 'input'
        },
        {
          name: 'salary',
          message: 'What is the salary for this role ?',
          choices: ['80000', '90000', '100000', '150000', '250000'],
          type: 'list'
        }
      ]).then((data) => {
        let answer1 = data.role;
        let answer2 = data.departmentId;
        let answer3 = data.salary;
      db.query('INSERT INTO role VALUES(?,?,?) ',[answer1, answer2 , answer3], (err, results) => {
        if(err){
          console.log(err)
        } else{
          console.table(results)
        }
      })
    })
    }
    // View all departments
    else if(data.answer === 'View All Departments'){
      db.query('SELECT * FROM department' , (err, results) => {
        if(err){
          console.log(err)
        }else{
          console.table(results)
        }
      })
    }
    // end of .then
  })