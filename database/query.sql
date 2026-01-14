SHOW DATABASES;
USE smart_garden;
SHOW TABLES;

SELECT * FROM users;
SELECT * FROM houses;
SELECT * FROM devices;
SELECT * FROM sensor_data;
SELECT * FROM alerts;
SELECT COUNT(*) FROM houses;
SELECT * FROM devices WHERE house_id = ?;

DELETE FROM devices WHERE id = 3;

SELECT id, name, email, password, role
FROM users
WHERE email = ?;

SELECT DISTINCT h.*
FROM houses h
LEFT JOIN house_members hm ON h.id = hm.house_id
WHERE h.owner_id = ?
   OR hm.user_id = ?;

SELECT id FROM users WHERE id = ?;
DELETE FROM house_members
WHERE house_id = ? AND user_id = ?;

SELECT *
FROM devices
WHERE house_id = ?;

SHOW CREATE TABLE houses;
DESCRIBE houses;

SHOW VARIABLES LIKE 'port';
SHOW VARIABLES LIKE 'hostname';
SELECT user, host FROM mysql.user;

USE smart_garden;

SELECT * FROM plant_zones;


