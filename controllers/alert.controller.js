const alertService = require('../services/alert.service');

const getAlerts = async (req, res) => {
  try {
    const { houseId } = req.params;

    if (!houseId) {
      return res.status(400).json({ message: 'houseId is required' });
    }

    const alerts = await alertService.getAlertsByHouse(houseId);

    return res.status(200).json({
      houseId,
      alerts
    });
  } catch (error) {
    console.error('Get alerts error:', error);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getAlerts
};
