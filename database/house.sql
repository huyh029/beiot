INSERT INTO houses (name, description, owner_id)
VALUES (?, ?, ?);

INSERT INTO house_members (house_id, user_id, role)
VALUES (LAST_INSERT_ID(), ?, 'OWNER');

UPDATE houses
SET name = ?, description = ?
WHERE id = ? AND owner_id = ?;

INSERT INTO house_members (house_id, user_id)
VALUES (?, ?);
