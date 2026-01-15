const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controller');
const auth = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Data
 *   description: Sensor data & statistics
 */

/**
 * @swagger
 * /api/data/{houseId}:
 *   get:
 *     summary: Get data statistics by house
 *     tags: [Data]
 *     parameters:
 *       - in: path
 *         name: houseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Data statistics
 */
router.get('/:houseId', auth, dataController.getStatistics);


module.exports = router;
