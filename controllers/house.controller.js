const houseService = require('../services/house.service');
const db = require('../config/db');

// Lấy danh sách houses
exports.getHouses = async (req, res) => {
  try {
    const houses = await houseService.getHouses();
    res.json(houses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Tạo house mới
exports.createHouse = (req, res) => {
  const { name, location, description } = req.body;

  // Check dữ liệu đầu vào
  if (!name || !location) {
    return res.status(400).json({
      message: 'Name and location are required'
    });
  }

  const sql = `
    INSERT INTO \`houses\` (\`name\`, \`location\`, \`description\`)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [name, location, description || null],
    (err, result) => {
      if (err) {
        console.error('Create house error:', err);
        return res.status(400).json({ message: err.message });
      }

      res.status(201).json({
        message: 'House created successfully',
        houseId: result.insertId
      });
    }
  );
};

// Cập nhật house
exports.updateHouse = async (req, res) => {
  try {
    const result = await houseService.updateHouse(
      req.params.houseId,
      req.body
    );
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Thêm thành viên vào house
exports.addMember = async (req, res) => {
  try {
    const result = await houseService.addMember(
      req.params.houseId,
      req.body
    );
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Xoá thành viên khỏi house
exports.deleteMember = async (req, res) => {
  try {
    const result = await houseService.deleteMember(
      req.params.houseId,
      req.params.userId
    );
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

// Lấy events của house
exports.getEvents = async (req, res) => {
  try {
    const events = await houseService.getEvents(req.params.houseId);
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
