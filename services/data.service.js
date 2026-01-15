const db = require('../config/db');

/**
 * Thống kê dữ liệu sensor theo house
 */
exports.getStatistics = async (houseId) => {
  const [rows] = await db.query(
    `
    SELECT
      AVG(sd.temperature)      AS temperatureAvg,
      AVG(sd.humidity)         AS humidityAvg,
      AVG(sd.soil_moisture)    AS soilMoistureAvg,
      AVG(sd.light)            AS lightAvg,
      AVG(sd.wind_speed)       AS windSpeedAvg
    FROM sensor_data sd
    JOIN devices d ON sd.device_id = d.id
    WHERE d.house_id = ?
    `,
    [houseId]
  );

  return {
    houseId,
    temperatureAvg: rows[0].temperatureAvg,
    humidityAvg: rows[0].humidityAvg,
    soilMoistureAvg: rows[0].soilMoistureAvg,
    lightAvg: rows[0].lightAvg,
    windSpeedAvg: rows[0].windSpeedAvg
  };
};
