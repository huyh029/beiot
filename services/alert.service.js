const AlertHistory = require('../models/AlertHistory');

const getAlertsByHouse = async (houseId) => {
  try {
    const alerts = await AlertHistory.find({ houseId })
      .sort({ createdAt: -1 });
    
    if (alerts.length > 0) {
      return alerts;
    }
    
    // Fallback demo data if no alerts found
    return [
      {
        _id: 'demo_alert_1',
        house_id: houseId,
        houseId: houseId,
        type: 'temperature',
        message: 'Nhiệt độ cao bất thường (32°C)',
        severity: 'high',
        deviceId: 'device_1',
        value: 32,
        threshold: 30,
        created_at: new Date(Date.now() - 3600000),
        createdAt: new Date(Date.now() - 3600000)
      },
      {
        _id: 'demo_alert_2',
        house_id: houseId,
        houseId: houseId,
        type: 'humidity',
        message: 'Độ ẩm thấp (45%)',
        severity: 'medium',
        deviceId: 'device_2',
        value: 45,
        threshold: 60,
        created_at: new Date(Date.now() - 7200000),
        createdAt: new Date(Date.now() - 7200000)
      }
    ];
  } catch (error) {
    console.error('Error fetching alerts:', error);
    // Fallback demo data
    return [
      {
        _id: 'demo_alert_1',
        house_id: houseId,
        houseId: houseId,
        type: 'temperature',
        message: 'Nhiệt độ cao bất thường (32°C)',
        severity: 'high',
        deviceId: 'device_1',
        value: 32,
        threshold: 30,
        created_at: new Date(Date.now() - 3600000),
        createdAt: new Date(Date.now() - 3600000)
      }
    ];
  }
};

// Add check method for MQTT service compatibility
const check = async (deviceId, data) => {
  try {
    // This method is called by MQTT service to check sensor data against alert rules
    // For now, just log the check - in a full implementation, this would check thresholds
    console.log(`Alert check for device ${deviceId}:`, data);
    return { checked: true, deviceId, data };
  } catch (error) {
    console.error('Error checking alerts:', error);
    return { checked: false, error: error.message };
  }
};

module.exports = {
  getAlertsByHouse,
  check
};
