const deviceService = require('../services/device.service');

exports.getByHouse = async (req, res) => {
  try {
    const devices = await deviceService.getDevicesByHouse(req.params.houseId);
    res.status(200).json(devices);
  } catch (error) {
    console.error('getByHouse error:', error);
    res.status(500).json({
      message: 'Lỗi khi lấy danh sách thiết bị theo house',
      error: error.message
    });
  }
};

exports.updateDevice = async (req, res) => {
  try {
    const device = await deviceService.updateDevice(
      req.params.deviceId,
      req.body
    );

    if (!device) {
      return res.status(404).json({
        message: 'Không tìm thấy thiết bị'
      });
    }

    res.status(200).json(device);
  } catch (error) {
    console.error('updateDevice error:', error);
    res.status(500).json({
      message: 'Lỗi khi cập nhật thiết bị',
      error: error.message
    });
  }
};
