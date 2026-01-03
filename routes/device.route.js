
const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/device.controller');


/**
 * @swagger
 * tags:
 *   name: Device
 *   description: Device management
 */

/**
 * @swagger
 * /api/devices/{houseId}:
 *   get:
 *     summary: Get devices by houseId
 *     tags: [Device]
 *     parameters:
 *       - in: path
 *         name: houseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List devices
 */
router.get('/:houseId', deviceController.getByHouse);

/**
 * @swagger
 * /api/devices/{deviceId}:
 *   put:
 *     summary: Update device
 *     tags: [Device]
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Update success
 */
router.put('/:deviceId', deviceController.updateDevice);


module.exports = router;
