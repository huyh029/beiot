const dataService = require('../services/data.service');

exports.getStatistics = async (req, res) => {
  try {
    const data = await dataService.getStatistics(req.params.houseId);

    if (!data) {
      return res.status(404).json({
        message: 'Không có dữ liệu thống kê cho house này'
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('getStatistics error:', error);
    res.status(500).json({
      message: 'Lỗi khi lấy dữ liệu thống kê',
      error: error.message
    });
  }
};
