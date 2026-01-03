const houseService = require('../services/house.service');

exports.getHouses = async (req, res) => {
  res.json(await houseService.getHouses());
};

exports.createHouse = async (req, res) => {
  res.status(201).json(await houseService.createHouse(req.body));
};

exports.updateHouse = async (req, res) => {
  res.json(await houseService.updateHouse(req.params.houseId, req.body));
};

exports.addMember = async (req, res) => {
  res.json(await houseService.addMember(req.params.houseId, req.body));
};

exports.deleteMember = async (req, res) => {
  res.json(
    await houseService.deleteMember(
      req.params.houseId,
      req.params.userId
    )
  );
};

exports.getEvents = async (req, res) => {
  res.json(await houseService.getEvents(req.params.houseId));
};
