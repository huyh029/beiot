const db = require("../config/db");

exports.updateStatus = async (deviceId) => {
  await db.query(
    `
    UPDATE devices
    SET status = 'ONLINE',
        last_seen = NOW()
    WHERE id = ?
    `,
    [deviceId]
  );
};

exports.getAll = async () => {
  const [rows] = await db.query(
    `
    SELECT *
    FROM devices
    ORDER BY created_at DESC
    `
  );
  return rows;
};

exports.getDevicesByHouse = async (houseId) => {
  const [rows] = await db.query(
    `
    SELECT *
    FROM devices
    WHERE house_id = ?
    ORDER BY created_at DESC
    `,
    [houseId]
  );
  return rows;
};

exports.updateDevice = async (deviceId, data) => {
  const [result] = await db.query(
    `
    UPDATE devices
    SET ?
    WHERE id = ?
    `,
    [data, deviceId]
  );

  if (result.affectedRows === 0) {
    throw new Error('Device not found');
  }

  return {
    message: 'Device updated successfully'
  };
};
