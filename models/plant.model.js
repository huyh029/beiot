module.exports = (sequelize, DataTypes) => {
  const Plant = sequelize.define(
    'Plant',
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
      zone_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      plant_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      variety: {
        type: DataTypes.STRING
      },
      planting_date: {
        type: DataTypes.DATEONLY
      },
      expected_harvest_date: {
        type: DataTypes.DATEONLY
      },
      moisture_min: {
        type: DataTypes.FLOAT
      },
      moisture_max: {
        type: DataTypes.FLOAT
      },
      light_min: {
        type: DataTypes.FLOAT
      },
      light_max: {
        type: DataTypes.FLOAT
      },
      temperature_min: {
        type: DataTypes.FLOAT
      },
      temperature_max: {
        type: DataTypes.FLOAT
      },
      notes: {
        type: DataTypes.TEXT
      }
    },
    {
      tableName: 'plants',
      timestamps: true
    }
  );

  return Plant;
};
