CREATE DATABASE smart_garden;
USE smart_garden;

CREATE TABLE devices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  device_id VARCHAR(50),
  status VARCHAR(20),
  last_seen DATETIME
);

CREATE TABLE sensor_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  device_id VARCHAR(50),
  temperature FLOAT,
  humidity FLOAT,
  ph FLOAT,
  ec FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE alerts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  device_id VARCHAR(50),
  type VARCHAR(50),
  value FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
