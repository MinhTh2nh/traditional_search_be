// routes/profile.js
const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');
const EditProfileController =  require('../controller/profileController');

/**
 * @openapi
 * /api/profile/{id}:
 *   get:
 *     summary: Get profile by user ID
 *     description: Retrieve profile information based on the provided user ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user profile to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Profile details successfully retrieved.
 *       '404':
 *         description: Profile not found for the given ID.
 *       '500':
 *         description: Error retrieving the profile.
 *     tags:
 *       - Profile
 * 
 *   post:
 *     summary: Edit profile by user ID
 *     description: Update profile information for the provided user ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user profile to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define properties here for editing the profile, e.g., name, email, etc.
 *               // Example:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Profile successfully updated.
 *       '404':
 *         description: Profile not found for the given ID.
 *       '500':
 *         description: Error updating the profile.
 *     tags:
 *       - Profile
 */

// routes/profile.js


// Get profile by username (you can add verifyToken if needed)
router.get('/:id', profileController.getProfileByID);
router.post('/:id', EditProfileController.editProfile);


module.exports = router;
