const db = require('../config/db');

exports.createZone = async (data) => {
  const [result] = await db.query(
    `INSERT INTO plant_zones (house_id, name, description, area_m2)
     VALUES (?, ?, ?, ?)`,
    [
      data.house_id,
      data.name,
      data.description || null,
      data.area_m2 || null
    ]
  );

  return {
    id: result.insertId,
    ...data
  };
};

exports.getByHouse = async (houseId) => {
  const [rows] = await db.query(
    `SELECT * FROM plant_zones WHERE house_id = ?`,
    [houseId]
  );
  return rows;
};

exports.updateZone = async (zoneId, data) => {
  await db.query(
    `UPDATE plant_zones
     SET name = ?, description = ?, area_m2 = ?
     WHERE id = ?`,
    [data.name, data.description || null, data.area_m2 || null, zoneId]
  );

  const [rows] = await db.query(
    `SELECT * FROM plant_zones WHERE id = ?`,
    [zoneId]
  );

  return rows[0];
};

exports.deleteZone = async (zoneId) => {
  await db.query(
    `DELETE FROM plant_zones WHERE id = ?`,
    [zoneId]
  );

  return { message: 'Plant zone deleted successfully' };
};
