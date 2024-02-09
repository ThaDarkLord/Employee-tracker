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
    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Departments', 'Quit']
  }]

function getAnswers(){ 
return inquirer.prompt(startQuestion)
  .then((data) => {
    // view all employees
    if (data.answer === 'View All Employees') {
      db.query(`SELECT * FROM employee`, (err, results) => {
        if (err) {
          console.log(err)
         
        } else {
          console.table(results)
          getAnswers()
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
            type: 'input',
            message: 'What is the employees role ?',
            
          },
          {
            name: 'managerId',
            type: 'list',
            message: 'What is the employee mananger id?',
            choices: [{name: 'Chad Brunswick', value: 1},{name:'Brett Brunswick', value: 2}, {name:'no manager assigned', value: 3}]
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
              getAnswers()
            }
          })
        })
    }
   
  // update employee role
    else if( data.answer === 'Update Employee Role'){
      inquirer.prompt([
        {
          name: 'employeeID',
          message: 'What is the employee id of the employee you would like to update?',
          type: 'input'
        },
        {
          name: 'first',
          message: 'What is the employees first name?',
          type: 'input'
        },
        {
          name: 'last',
          message: 'What is the employees last name?',
          type: 'input'
        },
        {
          name: 'role',
          message: 'What is the role id of the employee?',
          type: 'input' 
        },
        {
          name: 'manager',
          message: 'What is the employees manager id?',
          type: 'input'
        }
      ]).then((roleData) => {
      let input1 = roleData.first;
      let input2 = roleData.last;
      let input3 = roleData.role;
      let input4 = roleData.manager;
      let input5 = roleData.employeeID
    
      db.query('UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?', [input1, input2, input3, input4, input5],(err, results) => {
        if(err){
          console.log(err)
        } else {
          console.log('Employee role has successfuly been updated')
          getAnswers()
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
          getAnswers()
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
          name: 'salary',
          message: 'What is the salary for this role ?',
          choices: ['80000', '90000', '100000', '150000', '250000'],
          type: 'list'
        },
        {
          name: 'departmentId',
          message: 'What is the department ID for this role?',
          type: 'input'
        },
        
      ]).then((data) => {
        let answer1 = data.role;
        let answer2 = data.salary;
        let answer3 = data.departmentId;
        
      db.query('INSERT INTO role(title, salary, department_id) VALUES(?,?,?) ',[answer1, answer2 , answer3], (err, results) => {
        if(err){
          console.log(err)
        } else{
          console.log('Role succesfully added')
          getAnswers()
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
          getAnswers()
        }
      })
    }
    // add department
    else if(data.answer === 'Add Departments'){
      inquirer.prompt([
        {
          name: 'dname',
          message: 'What is the name of the department you would like to add?',
          type: 'input'
        }
      ]).then((data) => {
      let addedDeparment = data.dname
      db.query('INSERT INTO department(department_name) VALUES(?)' , [addedDeparment], (err, results) =>{
        if (err){
          console.log(err)
        }else{
          console.table(results)
          getAnswers()
        }
      })
    })
  }
  // Quit
  else if (data.answer === 'Quit'){
    process.exit()
  }
  else{
    return getAnswers()
  }
    // end of .then
  })
}
getAnswers()
