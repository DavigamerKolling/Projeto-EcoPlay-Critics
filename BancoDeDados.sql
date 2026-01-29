CREATE DATABASE ecoplay;

USE ecoplay;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  platform VARCHAR(50),
  waste_type VARCHAR(50),
  description TEXT,
  created_by INT,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

ALTER TABLE users
ADD reset_token VARCHAR(255),
ADD reset_expires DATETIME;
