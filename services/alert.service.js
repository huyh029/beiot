const db = require('../config/db');

const getAlertsByHouse = async (houseId) => {
  const [rows] = await db.query(
    'SELECT * FROM alerts WHERE house_id = ? ORDER BY created_at DESC',
    [houseId]
  );
  return rows;
};

module.exports = {
  getAlertsByHouse
};
