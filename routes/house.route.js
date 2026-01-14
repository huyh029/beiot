const express = require('express');
const router = express.Router();
const houseController = require('../controllers/house.controller');
const authMiddleware = require('../middleware/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: House
 *   description: House management
 */

/**
 * @swagger
 * /api/house:
 *   get:
 *     summary: Get all houses of current user
 *     tags: [House]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List houses
 */
router.get('/', authMiddleware, houseController.getHouses);

/**
 * @swagger
 * /api/house:
 *   post:
 *     summary: Create new house
 *     tags: [House]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Garden of B
 *               location:
 *                 type: string
 *                 example: Ho Chi Minh
 *               description:
 *                 type: string
 *                 example: Vườn ngoài ban công
 *     responses:
 *       201:
 *         description: House created successfully
 */
router.post('/', authMiddleware, houseController.createHouse);

/**
 * @swagger
 * /api/house/update-house/{houseId}:
 *   put:
 *     summary: Update house info
 *     tags: [House]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: houseId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Garden of B
 *               location:
 *                 type: string
 *                 example: Ho Chi Minh
 *               description:
 *                 type: string
 *                 example: Vườn ngoài ban công
 *     responses:
 *       200:
 *         description: House updated successfully
 */
router.put('/update-house/:houseId', authMiddleware, houseController.updateHouse);

/**
 * @swagger
 * /api/house/update-member/{houseId}:
 *   put:
 *     summary: Add member to house
 *     tags: [House]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: houseId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: member@gmail.com
 *               role:
 *                 type: string
 *                 enum: [OWNER, MEMBER]
 *                 example: MEMBER
 *     responses:
 *       200:
 *         description: Member added successfully
 */
router.put('/update-member/:houseId', authMiddleware, houseController.addMember);

/**
 * @swagger
 * /api/house/delete-member/{houseId}/{userId}:
 *   put:
 *     summary: Remove member from house
 *     tags: [House]
 *     security:
 *       - bearerAuth: []
  *     parameters:
 *       - in: path
 *         name: houseId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: member@gmail.com
 *               role:
 *                 type: string
 *                 enum: [OWNER, MEMBER]
 *                 example: MEMBER
 *     responses:
 *       200:
 *         description: Member added successfully
 */

router.put(  '/delete-member/:houseId/:userId',  authMiddleware,  houseController.deleteMember);

/**
 * @swagger
 * /api/house/events/{houseId}:
 *   get:
 *     summary: Get events by house
 *     tags: [House]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: houseId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: List events
 */
router.get('/events/:houseId', authMiddleware, houseController.getEvents);


module.exports = router;
