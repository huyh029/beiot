const db = require("../config/db");
exports.updateStatus = async (deviceId) => {
  await db.query(
    "UPDATE devices SET status='online', last_seen=NOW() WHERE device_id=?",
    [deviceId]
  );
};
exports.getAll = async () => {
  const [rows] = await db.query("SELECT * FROM devices");
  return rows;
};

exports.getDevicesByHouse = async (houseId) => {
  return [
    { id: 1, name: 'Sensor nhiệt độ', houseId },
    { id: 2, name: 'Sensor độ ẩm', houseId }
  ];
};

exports.updateDevice = async (deviceId, body) => {
  return {
    id: deviceId,
    ...body
  };
};
