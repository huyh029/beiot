const dataService = require('../services/data.service');

const getStatistics = async (req, res) => {
  try {
    const { houseId } = req.params;

    if (!houseId) {
      return res.status(400).json({ message: 'houseId is required' });
    }

    const statistics = await dataService.getStatistics(houseId);

    return res.status(200).json(statistics);
  } catch (error) {
    console.error('Get statistics error:', error);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getStatistics
};