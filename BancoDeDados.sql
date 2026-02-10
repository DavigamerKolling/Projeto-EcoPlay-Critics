CREATE DATABASE ecoplay;

USE ecoplay;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  reset_token VARCHAR(255),
  reset_expires DATETIME
);

CREATE TABLE games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  slug VARCHAR(140) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  cover_url VARCHAR(255),
  youtube_id VARCHAR(32),
  platform VARCHAR(50),
  platforms_json JSON,
  waste_type VARCHAR(50),
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE game_media (
  id INT AUTO_INCREMENT PRIMARY KEY,
  game_id INT NOT NULL,
  media_type ENUM('image','video_file') NOT NULL,
  url VARCHAR(255) NOT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);