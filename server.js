const mysql = require('mysql2');
const inquirer = require('inquirer')

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      password: 'password123',
      database: 'movies_db'
    },
    console.log(`Connected to the recruiter_db database.`)
  );
  


inquirer.Prompt(
    [
        {
            type: 'list',
            message: 'What would you like to do',
            choices: ['']

            
        }
    ]
)