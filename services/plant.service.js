const db = require('../config/db');

exports.createPlant = async (data) => {
  const [result] = await db.query(
    `INSERT INTO plants (
      house_id, zone_id, plant_type, variety,
      planting_date, expected_harvest_date,
      moisture_min, moisture_max,
      light_min, light_max,
      temperature_min, temperature_max,
      notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.house_id,
      data.zone_id,
      data.plant_type,
      data.variety,
      data.planting_date,
      data.expected_harvest_date,
      data.moisture_min,
      data.moisture_max,
      data.light_min,
      data.light_max,
      data.temperature_min,
      data.temperature_max,
      data.notes
    ]
  );

  return { id: result.insertId, ...data };
};

exports.getByZone = async (zoneId) => {
  const [rows] = await db.query(
    `SELECT * FROM plants WHERE zone_id = ?`,
    [zoneId]
  );
  return rows;
};

exports.getByHouse = async (houseId) => {
  const [rows] = await db.query(
    `SELECT * FROM plants WHERE house_id = ?`,
    [houseId]
  );
  return rows;
};

exports.updatePlant = async (plantId, data) => {
  await db.query(
    `UPDATE plants SET
      zone_id = ?, plant_type = ?, variety = ?,
      planting_date = ?, expected_harvest_date = ?,
      moisture_min = ?, moisture_max = ?,
      light_min = ?, light_max = ?,
      temperature_min = ?, temperature_max = ?,
      notes = ?
     WHERE id = ?`,
    [
      data.zone_id,
      data.plant_type,
      data.variety,
      data.planting_date,
      data.expected_harvest_date,
      data.moisture_min,
      data.moisture_max,
      data.light_min,
      data.light_max,
      data.temperature_min,
      data.temperature_max,
      data.notes,
      plantId
    ]
  );

  const [rows] = await db.query(
    `SELECT * FROM plants WHERE id = ?`,
    [plantId]
  );

  return rows[0];
};

exports.deletePlant = async (plantId) => {
  await db.query(
    `DELETE FROM plants WHERE id = ?`,
    [plantId]
  );

  return { message: 'Plant deleted successfully' };
};
