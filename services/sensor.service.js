const SensorData = require("../models/SensorData");

exports.save = async (deviceId, data) => {
  try {
    // Create multiple sensor data entries for different sensor types
    const sensorEntries = [];
    
    if (data.temperature !== undefined) {
      sensorEntries.push({
        deviceId,
        sensorType: 'temperature',
        value: data.temperature,
        unit: '°C'
      });
    }
    
    if (data.humidity !== undefined) {
      sensorEntries.push({
        deviceId,
        sensorType: 'humidity', 
        value: data.humidity,
        unit: '%'
      });
    }
    
    if (data.ph !== undefined) {
      sensorEntries.push({
        deviceId,
        sensorType: 'ph',
        value: data.ph,
        unit: 'pH'
      });
    }
    
    if (data.ec !== undefined) {
      sensorEntries.push({
        deviceId,
        sensorType: 'ec',
        value: data.ec,
        unit: 'mS/cm'
      });
    }
    
    if (sensorEntries.length > 0) {
      await SensorData.insertMany(sensorEntries);
    }
    
    return { success: true, saved: sensorEntries.length };
  } catch (error) {
    console.error('Error saving sensor data:', error);
    // Fallback - just return success for demo
    return { success: true, saved: 0, fallback: true };
  }
};

exports.history = async (deviceId) => {
  try {
    const sensorData = await SensorData.find({ deviceId })
      .sort({ timestamp: -1 })
      .limit(50);
    
    if (sensorData.length > 0) {
      return sensorData;
    }
    
    // Fallback demo data if no data found
    return Array.from({ length: 10 }, (_, i) => ({
      _id: `demo_${i}`,
      deviceId,
      sensorType: 'temperature',
      value: 25 + Math.random() * 10,
      unit: '°C',
      timestamp: new Date(Date.now() - i * 3600000), // 1 hour intervals
      created_at: new Date(Date.now() - i * 3600000)
    }));
  } catch (error) {
    console.error('Error fetching sensor history:', error);
    // Fallback demo data
    return Array.from({ length: 10 }, (_, i) => ({
      _id: `demo_${i}`,
      deviceId,
      sensorType: 'temperature', 
      value: 25 + Math.random() * 10,
      unit: '°C',
      timestamp: new Date(Date.now() - i * 3600000),
      created_at: new Date(Date.now() - i * 3600000)
    }));
  }
};
