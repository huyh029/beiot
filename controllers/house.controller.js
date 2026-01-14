const houseService = require('../services/house.service');
const db = require('../config/db');

// Lấy houses của user
exports.getHouses = async (req, res) => {
  try {
    const userId = req.user.id;
    const houses = await houseService.getHouses(userId);
    res.json(houses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo house + add owner vào house_members
exports.createHouse = async (req, res) => {
  try {
    const ownerId = req.user.id;
    const { name, location, description } = req.body;

    if (!name || !location) {
      return res.status(400).json({
        message: 'Name and location are required'
      });
    }

    const house = await houseService.createHouse({
      name,
      location,
      description,
      ownerId
    });

    res.status(201).json(house);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateHouse = async (req, res) => {
  try {
    const result = await houseService.updateHouse(
      req.params.houseId,
      req.body,
      req.user.id
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.addMember = async (req, res) => {
  try {
    const result = await houseService.addMember(
      req.params.houseId,
      req.body.userId,
      req.user.id
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const result = await houseService.deleteMember(
      req.params.houseId,
      req.params.userId,
      req.user.id
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await houseService.getEvents(req.params.houseId);
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*
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
*/