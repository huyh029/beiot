const express = require('express');
const router = express.Router();
const houseController = require('../controllers/house.controller');


/**
 * @swagger
 * tags:
 *   name: House
 *   description: House management
 */

/**
 * @swagger
 * /v1/house:
 *   get:
 *     summary: Get all houses
 *     tags: [House]
 *     responses:
 *       200:
 *         description: List houses
 */
router.get('/', houseController.getHouses);

/**
 * @swagger
 * /v1/house:
 *   post:
 *     summary: Create new house
 *     tags: [House]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: House created
 */
router.post('/', houseController.createHouse);

/**
 * @swagger
 * /v1/house/update-house/{houseId}:
 *   put:
 *     summary: Update house info
 *     tags: [House]
 *     parameters:
 *       - in: path
 *         name: houseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Update success
 */
router.put('/update-house/:houseId', houseController.updateHouse);

/**
 * @swagger
 * /v1/house/update-member/{houseId}:
 *   put:
 *     summary: Add member to house
 *     tags: [House]
 *     parameters:
 *       - in: path
 *         name: houseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Member added
 */
router.put('/update-member/:houseId', houseController.addMember);

/**
 * @swagger
 * /v1/house/delete-member/{houseId}/{userId}:
 *   put:
 *     summary: Remove member from house
 *     tags: [House]
 *     parameters:
 *       - in: path
 *         name: houseId
 *         required: true
 *       - in: path
 *         name: userId
 *         required: true
 *     responses:
 *       200:
 *         description: Member removed
 */
router.put('/delete-member/:houseId/:userId', houseController.deleteMember);

/**
 * @swagger
 * /v1/house/events/{houseId}:
 *   get:
 *     summary: Get events / alerts by house
 *     tags: [House]
 *     parameters:
 *       - in: path
 *         name: houseId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List events of the house
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: House not found
 */
router.get('/events/:houseId', houseController.getEvents);

module.exports = router;
