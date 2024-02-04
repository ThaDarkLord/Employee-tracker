SELECT first_name, last_name, id
FROM employee
JOIN role ON employee.role_id = role.id