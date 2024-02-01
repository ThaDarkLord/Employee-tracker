DROP DATABASE IF EXISTS recruiter_db;
CREATE DATABASE recuiter_db;

USE recruiter_db;

CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY AUTO _INCREMENT,
    name VARCHAR(30),
);

CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY ,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT 
);

CREATE TABLE employee(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT 
);