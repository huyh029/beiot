const express = require('express');
const router = express.Router();
const controller = require('../controllers/plantZone.controller');
const auth = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: PlantZone
 *   description: Plant Zone management
 */

/**
 * @swagger
 * /api/plant-zones:
 *   post:
 *     summary: Create a new plant zone
 *     tags: [PlantZone]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - house_id
 *               - name
 *             properties:
 *               house_id:
 *                 type: integer
 *                 example: 27
 *               name:
 *                 type: string
 *                 example: Luống A
 *               description:
 *                 type: string
 *                 example: Khu trồng rau ăn lá
 *               area_m2:
 *                 type: number
 *                 example: 12.5
 *     responses:
 *       200:
 *         description: Zone created successfully
 */
router.post('/', auth, controller.createZone);

/**
 * @swagger
 * /api/plant-zones/house/{houseId}:
 *   get:
 *     summary: Get plant zones by house
 *     tags: [PlantZone]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: houseId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 27
 *     responses:
 *       200:
 *         description: List of zones
 */
router.get('/house/:houseId', auth, controller.getZonesByHouse);

/**
 * @swagger
 * /api/plant-zones/{id}:
 *   put:
 *     summary: Update plant zone
 *     tags: [PlantZone]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Luống B
 *               description:
 *                 type: string
 *                 example: Khu trồng rau ăn quả
 *               area_m2:
 *                 type: number
 *                 example: 15
 *     responses:
 *       200:
 *         description: Zone updated
 */
router.put('/:id', auth, controller.updateZone);

/**
 * @swagger
 * /api/plant-zones/{id}:
 *   delete:
 *     summary: Delete plant zone
 *     tags: [PlantZone]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Zone deleted
 */
router.delete('/:id', auth, controller.deleteZone);

module.exports = router;
