const dataService = require('../services/data.service');

exports.getStatistics = async (req, res) => {
  const data = await dataService.getStatistics(req.params.houseId);
  res.json(data);
};
