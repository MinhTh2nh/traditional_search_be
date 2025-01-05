const express = require('express');
const router = express.Router();
const RegisterController = require('../controller/RegisterController');


/**
 * @openapi
 * /api/register:
 *   post:
 *     summary: Register a new user account
 *     description: Register a new user with an email and password.
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
 *       '201':
 *         description: User successfully registered
 *       '409':
 *         description: This email is already in use
 *       '500':
 *         description: Error registering the user
 *     tags:
 *       - Register
*/

router.post('/Register',RegisterController.RegisterAccount);
module.exports = router;
