const houseService = require('../services/house.service');

const getHouses = async (req, res) => {
  try {
    const houses = await houseService.getHouses();
    res.json(houses);
  } catch (error) {
    console.error('Get houses error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createHouse = async (req, res) => {
  try {
    const house = await houseService.createHouse(req.body);
    res.status(201).json(house);
  } catch (error) {
    console.error('Create house error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateHouse = async (req, res) => {
  try {
    const house = await houseService.updateHouse(req.params.houseId, req.body);
    res.json(house);
  } catch (error) {
    console.error('Update house error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const addMember = async (req, res) => {
  try {
    const result = await houseService.addMember(req.params.houseId, req.body);
    res.json(result);
  } catch (error) {
    console.error('Add member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteMember = async (req, res) => {
  try {
    const result = await houseService.deleteMember(req.params.houseId, req.params.userId);
    res.json(result);
  } catch (error) {
    console.error('Delete member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await houseService.getEvents(req.params.houseId);
    res.json(events);
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getHouses,
  createHouse,
  updateHouse,
  addMember,
  deleteMember,
  getEvents
};