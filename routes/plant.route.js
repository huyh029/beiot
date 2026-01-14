const express = require('express');
const router = express.Router();
const controller = require('../controllers/plant.controller');
const auth = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Plant
 *   description: Plant management
 */

/**
 * @swagger
 * /api/plants:
 *   post:
 *     summary: Create a new plant
 *     tags: [Plant]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [house_id, zone_id, plant_type]
 *             properties:
 *               house_id:
 *                 type: integer
 *                 example: 27
 *               zone_id:
 *                 type: integer
 *                 example: 1
 *               plant_type:
 *                 type: string
 *                 example: Rau cải
 *               variety:
 *                 type: string
 *                 example: Cải ngọt
 *               planting_date:
 *                 type: string
 *                 format: date
 *                 example: 2026-01-01
 *               expected_harvest_date:
 *                 type: string
 *                 format: date
 *                 example: 2026-02-01
 *               moisture_min:
 *                 type: number
 *                 example: 40
 *               moisture_max:
 *                 type: number
 *                 example: 70
 *               notes:
 *                 type: string
 *                 example: Tưới nước mỗi ngày
 *     responses:
 *       200:
 *         description: Plant created successfully
 */
router.post('/', auth, controller.createPlant);

/**
 * @swagger
 * /api/plants/house/{houseId}:
 *   get:
 *     summary: Get plants by house
 *     tags: [Plant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: houseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of plants
 */
router.get('/house/:houseId', auth, controller.getPlantsByHouse);

/**
 * @swagger
 * /api/plants/zone/{zoneId}:
 *   get:
 *     summary: Get plants by zone
 *     tags: [Plant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: zoneId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of plants
 */
router.get('/zone/:zoneId', auth, controller.getPlantsByZone);

/**
 * @swagger
 * /api/plants/{id}:
 *   put:
 *     summary: Update plant
 *     tags: [Plant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Plant updated
 */
router.put('/:id', auth, controller.updatePlant);

/**
 * @swagger
 * /api/plants/{id}:
 *   delete:
 *     summary: Delete plant
 *     tags: [Plant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Plant deleted
 */
router.delete('/:id', auth, controller.deletePlant);

module.exports = router;
