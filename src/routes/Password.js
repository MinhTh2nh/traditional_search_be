const express = require('express');
const router = express.Router();
const PasswordController = require('../controller/PasswordController');
// const ForgotPasswordController =  require('../controller/profileController');

/**
 * @openapi
 * /api/password:
 *   post:
 *     summary: Change user password
 *     description: Change the password for a user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *               oldPassword:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password changed successfully
 *       '400':
 *         description: Invalid request payload or missing required fields
 *       '401':
 *         description: Unauthorized access, authentication failed
 *       '500':
 *         description: Error changing the password
 *     tags:
 *       - Password
 */


router.post('/password',PasswordController.changePassword);
// router.post('/:email', ForgotPasswordController.ForgotPassword)
module.exports = router;
