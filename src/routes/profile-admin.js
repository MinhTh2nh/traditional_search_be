const express = require('express');
const router = express.Router();
const ListAllprofileController =  require('../controller/profileController');
const ViewProfileByIDController =  require('../controller/profileController');
const profileController = require('../controller/profileController');
const { verifyToken } = require('../middleware/authMiddleware');

/**
 * @openapi
 * /api/profile:
 *   get:
 *     summary: Get all profiles
 *     description: Retrieve a list of all profiles.
 *     responses:
 *       '200':
 *         description: A list of profiles successfully retrieved.
 *       '500':
 *         description: Error retrieving profiles.
 *     tags:
 *       - Profile
 * 
 *   post:
 *     summary: Create a new profile
 *     description: Add a new user profile.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             // Define properties here for creating a new profile, e.g., name, email, etc.
 *             // Example:
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Profile successfully created.
 *       '401':
 *         description: Unauthorized, authentication token is missing or invalid.
 *       '500':
 *         description: Error creating a new profile.
 *     tags:
 *       - Profile
 */

/**
 * @openapi
 * /api/profile/{id}:
 *   get:
 *     summary: Get profile by ID
 *     description: Retrieve profile information based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the profile to retrieve.
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
 *   put:
 *     summary: Update profile by ID
 *     description: Update profile information for the provided ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the profile to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             // Define properties here for updating the profile, e.g., name, email, etc.
 *             // Example:
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Profile successfully updated.
 *       '401':
 *         description: Unauthorized, authentication token is missing or invalid.
 *       '404':
 *         description: Profile not found for the given ID.
 *       '500':
 *         description: Error updating the profile.
 *     tags:
 *       - Profile
 * 
 *   delete:
 *     summary: Delete profile by ID
 *     description: Delete profile information for the provided ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the profile to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Profile successfully deleted.
 *       '401':
 *         description: Unauthorized, authentication token is missing or invalid.
 *       '404':
 *         description: Profile not found for the given ID.
 *       '500':
 *         description: Error deleting the profile.
 *     tags:
 *       - Profile
 */


router.get('/', ListAllprofileController.ListAllProfile);
router.get('/:id',ViewProfileByIDController.ViewProfileByID)
router.post('/', verifyToken, profileController.AddNewUser);
router.put('/:id',verifyToken, profileController.updateProfileById)
router.delete('/:id',verifyToken, profileController.DeleteProfileByID)
module.exports = router;