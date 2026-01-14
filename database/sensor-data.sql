SELECT
    sd.*,
    d.device_code
FROM sensor_data sd
JOIN devices d ON sd.device_id = d.id
WHERE d.house_id = ?
ORDER BY sd.created_at DESC
LIMIT 100;
