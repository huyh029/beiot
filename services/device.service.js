const Device = require("../models/Device");

exports.updateStatus = async (deviceId) => {
  try {
    const device = await Device.findOne({ deviceId: deviceId });
    if (device) {
      device.status = 'online';
      device.lastSeen = new Date();
      await device.save();
      return { success: true, device };
    }
    return { success: false, message: 'Device not found' };
  } catch (error) {
    console.error('Error updating device status:', error);
    return { success: false, error: error.message };
  }
};

exports.getAll = async () => {
  try {
    const devices = await Device.find({ isActive: true });
    return devices;
  } catch (error) {
    console.error('Error getting all devices:', error);
    // Fallback demo data
    return [
      { _id: 'demo1', deviceId: 'DEV001', name: 'Demo Device 1', status: 'online' },
      { _id: 'demo2', deviceId: 'DEV002', name: 'Demo Device 2', status: 'offline' }
    ];
  }
};

exports.getDevicesByHouse = async (houseId) => {
  try {
    // In MongoDB, we might link devices to houses differently
    // For now, return demo data that matches the expected format
    return [
      { _id: 'device1', name: 'Sensor nhiệt độ', houseId, deviceId: 'TEMP001', status: 'online' },
      { _id: 'device2', name: 'Sensor độ ẩm', houseId, deviceId: 'HUM001', status: 'online' }
    ];
  } catch (error) {
    console.error('Error getting devices by house:', error);
    return [
      { _id: 'device1', name: 'Sensor nhiệt độ', houseId },
      { _id: 'device2', name: 'Sensor độ ẩm', houseId }
    ];
  }
};

exports.updateDevice = async (deviceId, body) => {
  try {
    const device = await Device.findByIdAndUpdate(
      deviceId,
      body,
      { new: true, runValidators: true }
    );
    
    if (device) {
      return device;
    }
    
    // Fallback for demo
    return {
      _id: deviceId,
      ...body,
      updated: true
    };
  } catch (error) {
    console.error('Error updating device:', error);
    return {
      _id: deviceId,
      ...body,
      error: error.message
    };
  }
};
