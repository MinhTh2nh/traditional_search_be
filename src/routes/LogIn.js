const express = require('express');
const router = express.Router();
const LogInController = require('../controller/LogInController');

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in with an email and password
 *     description: Authenticate and log in a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *       '401':
 *         description: Invalid credentials
 *       '500':
 *         description: Error checking credentials
 *     tags:
 *       - Login
 */


router.post('/login',LogInController.LogInAccount);
module.exports = router;

