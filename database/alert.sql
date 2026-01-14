SELECT *
FROM alerts
WHERE house_id = ?
ORDER BY created_at DESC;

SELECT *
FROM events
WHERE house_id = ?
ORDER BY created_at DESC;
