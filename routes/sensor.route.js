const router = require("express").Router();
const service = require("../services/sensor.service");
router.get("/history/:deviceId", async (req, res) => {
  const data = await service.history(req.params.deviceId);
  res.json(data);
});
module.exports = router;
