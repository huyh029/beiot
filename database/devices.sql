INSERT INTO devices (
    house_id,
    device_code,
    name,
    location,
    status
)
VALUES (
    27,
    'ESP32_001',
    'ESP32 Sân vườn',
    'Sân vườn',
    'ONLINE'
);



UPDATE devices
SET name = ?, location = ?, status = ?
WHERE id = ?;

UPDATE devices
SET loaction = 'Hâ Noi', status = 'ONLINE'
WHERE id = 1;
