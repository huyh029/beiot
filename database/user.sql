INSERT INTO users (name, email, password, role)
VALUES (?, ?, ?, 'USER');

INSERT INTO users (name, email, password, role) VALUES
('ngan', 'admin@gmail.com', '$2b$10$hash_admin', 'USER'),
('Hieu', 'hieu@gmail.com', '$2b$10$hash_huy', 'USER'),
('Long', 'long@gmail.com', '$2b$10$hash_usera', 'USER');



