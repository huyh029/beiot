const service = require('../services/plant.service');

exports.createPlant = async (req, res) => {
  try {
    const plant = await service.createPlant({
      house_id: req.body.house_id,
      zone_id: req.body.zone_id,
      plant_type: req.body.plant_type,
      variety: req.body.variety,
      planting_date: req.body.planting_date,
      expected_harvest_date: req.body.expected_harvest_date,
      moisture_min: req.body.moisture_min,
      moisture_max: req.body.moisture_max,
      light_min: req.body.light_min,
      light_max: req.body.light_max,
      temperature_min: req.body.temperature_min,
      temperature_max: req.body.temperature_max,
      notes: req.body.notes
    });

    res.status(201).json({
      message: 'Plant created successfully',
      data: plant
    });
  } catch (err) {
    console.error('Create plant error:', err.message);

    res.status(400).json({
      message: 'Create plant failed',
      error: err.message
    });
  }
};

exports.getPlantsByZone = async (req, res) => {
  try {
    const plants = await service.getByZone(req.params.zoneId);
    res.json(plants);
  } catch (err) {
    console.error('Get plants by zone error:', err.message);
    res.status(500).json({
      message: 'Failed to get plants by zone',
      error: err.message
    });
  }
};

exports.getPlantsByHouse = async (req, res) => {
  try {
    const plants = await service.getByHouse(req.params.houseId);
    res.json(plants);
  } catch (err) {
    console.error('Get plants by house error:', err.message);
    res.status(500).json({
      message: 'Failed to get plants by house',
      error: err.message
    });
  }
};

exports.updatePlant = async (req, res) => {
  try {
    const plantId = req.params.id;
    const data = {
      zone_id: req.body.zone_id,
      plant_type: req.body.plant_type,
      variety: req.body.variety,
      planting_date: req.body.planting_date,
      expected_harvest_date: req.body.expected_harvest_date,
      moisture_min: req.body.moisture_min,
      moisture_max: req.body.moisture_max,
      light_min: req.body.light_min,
      light_max: req.body.light_max,
      temperature_min: req.body.temperature_min,
      temperature_max: req.body.temperature_max,
      notes: req.body.notes
    };

    const result = await service.updatePlant(plantId, data);
    res.json({
      message: 'Plant updated successfully',
      data: result
    });
  } catch (err) {
    console.error('Update plant error:', err.message);
    res.status(400).json({
      message: 'Update plant failed',
      error: err.message
    });
  }
};

exports.deletePlant = async (req, res) => {
  try {
    const plantId = req.params.id;
    const result = await service.deletePlant(plantId);
    res.json({
      message: 'Plant deleted successfully',
      data: result
    });
  } catch (err) {
    console.error('Delete plant error:', err.message);
    res.status(400).json({
      message: 'Delete plant failed',
      error: err.message
    });
  }
};
