const deviceService = require('../services/device.service');

exports.getByHouse = async (req, res) => {
  const devices = await deviceService.getDevicesByHouse(req.params.houseId);
  res.json(devices);
};

exports.updateDevice = async (req, res) => {
  const device = await deviceService.updateDevice(
    req.params.deviceId,
    req.body
  );
  res.json(device);
};
