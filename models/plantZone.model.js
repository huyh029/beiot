module.exports = (sequelize, DataTypes) => {
  const PlantZone = sequelize.define(
    'PlantZone',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      house_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      area_m2: {
        type: DataTypes.FLOAT
      }
    },
    {
      tableName: 'plant_zones',
      timestamps: true
    }
  );

  return PlantZone;
};
