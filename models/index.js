const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/db'); 

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.PlantZone = require('./plantZone.model')(sequelize, DataTypes);
db.Plant = require('./plant.model')(sequelize, DataTypes);

db.PlantZone.hasMany(db.Plant, { foreignKey: 'zone_id' });
db.Plant.belongsTo(db.PlantZone, { foreignKey: 'zone_id' });

module.exports = db;
