const service = require('../services/plantZone.service');

exports.createZone = async (req, res) => {
  try {
    const data = {
      house_id: req.body.house_id,
      name: req.body.name,
      description: req.body.description,
      area_m2: req.body.area_m2
    };

    const zone = await service.createZone(data);
    res.status(201).json({
      message: 'Plant zone created successfully',
      data: zone
    });
  } catch (err) {
    console.error('Create zone error:', err.message);
    res.status(400).json({
      message: 'Create zone failed',
      error: err.message
    });
  }
};

exports.getZonesByHouse = async (req, res) => {
  try {
    const zones = await service.getByHouse(req.params.houseId);
    res.json(zones);
  } catch (err) {
    console.error('Get zones by house error:', err.message);
    res.status(500).json({
      message: 'Failed to get zones',
      error: err.message
    });
  }
};

exports.updateZone = async (req, res) => {
  try {
    const zoneId = req.params.id;
    const data = {
      name: req.body.name,
      description: req.body.description,
      area_m2: req.body.area_m2
    };

    const result = await service.updateZone(zoneId, data);
    res.json({
      message: 'Plant zone updated successfully',
      data: result
    });
  } catch (err) {
    console.error('Update zone error:', err.message);
    res.status(400).json({
      message: 'Update zone failed',
      error: err.message
    });
  }
};

exports.deleteZone = async (req, res) => {
  try {
    const zoneId = req.params.id;
    const result = await service.deleteZone(zoneId);
    res.json({
      message: 'Plant zone deleted successfully',
      data: result
    });
  } catch (err) {
    console.error('Delete zone error:', err.message);
    res.status(400).json({
      message: 'Delete zone failed',
      error: err.message
    });
  }
};
