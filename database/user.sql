INSERT INTO users (name, email, password, role)
VALUES ('Long', 'long@gmail.com', '$2b$10$hash_long', 'USER');

INSERT INTO users (name, email, password, role) VALUES
('ngan', 'admin@gmail.com', '$2b$10$hash_admin', 'USER'),
('Hieu', 'hieu@gmail.com', '$2b$10$hash_huy', 'USER'),
('Long', 'long@gmail.com', '$2b$10$hash_usera', 'USER');

delete FROM users WHERE id = 38;

UPDATE users
SET password = '$2b$10$EYkFTZ7gIBLr2l9.Ru2m0OIL/PxqqIOjcfRL6wurlvY6IfYl12o9C'
WHERE email = 'long@gmail.com';

SELECT id, email, password
FROM users
WHERE email = 'long@gmail.com';



