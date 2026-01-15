INSERT INTO devices (
    house_id,
    device_code,
    name,
    location,
    status,
    created_at
) VALUES (
    1,
    'ESP32-001',
    'Sensor độ ẩm đất',
    'Luống A',
    'OFFLINE',
    NOW()
);


UPDATE devices
SET name = ?, location = ?, status = ?
WHERE id = ?;

UPDATE devices
SET loaction = 'Hâ Noi', status = 'ONLINE'
WHERE id = 1;
