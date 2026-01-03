const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controller');


/**
 * @swagger
 * tags:
 *   name: Data
 *   description: Sensor data & statistics
 */

/**
 * @swagger
 * /v1/data/{houseId}:
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
router.get('/:houseId', dataController.getStatistics);


module.exports = router;
