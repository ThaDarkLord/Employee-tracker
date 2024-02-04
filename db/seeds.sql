INSERT INTO department(department_name)
VALUES ("Sales"),
('Engineering'),
('Financial'),
('Legality');

INSERT INTO role (title, department_id, salary)
VALUES ("Sales Lead", 1, 100000),
("Lead Engineer", 2, 150000),
("Account Manager", 3, 160000),
("Legal Team Lead", 4, 250000),
("Engineering team member", 2, 100000),
("Financial team member", 3, 90000),
("Legality team member", 4, 75000);
;

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Chad", "Brunswick", 1, NULL ),
("Brett", "Brunswick", 1, NULL ),
("Chase", "Wilson", 1, 1 ),
("Seth", "Carlo", 1, 2 );