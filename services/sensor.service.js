const db = require("../config/db");
exports.save = async (deviceId, data) => {
  await db.query(
    `INSERT INTO sensor_data(device_id, temperature, humidity, ph, ec)
     VALUES (?, ?, ?, ?, ?)`,
    [deviceId, data.temperature, data.humidity, data.ph, data.ec]
  );
};
exports.history = async (deviceId) => {
  const [rows] = await db.query(
    "SELECT * FROM sensor_data WHERE device_id=? ORDER BY created_at DESC LIMIT 50",
    [deviceId]
  );
  return rows;
};
