const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alert.controller');
const auth = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Alert
 *   description: Alert & event APIs
 */

/**
 * @swagger
 * /api/alerts/{houseId}:
 *   get:
 *     summary: Get alerts by houseId
 *     tags: [Alert]
 *     parameters:
 *       - in: path
 *         name: houseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of alerts
 *       400:
 *         description: Invalid houseId
 *       500:
 *         description: Server error
 */
router.get('/:houseId', auth, alertController.getAlerts);

module.exports = router;
