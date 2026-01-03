const deviceService = require('../services/device.service');

const getByHouse = async (req, res) => {
  try {
    const devices = await deviceService.getDevicesByHouse(req.params.houseId);
    res.json(devices);
  } catch (error) {
    console.error('Get devices by house error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateDevice = async (req, res) => {
  try {
    const device = await deviceService.updateDevice(req.params.deviceId, req.body);
    res.json(device);
  } catch (error) {
    console.error('Update device error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getByHouse,
  updateDevice
};