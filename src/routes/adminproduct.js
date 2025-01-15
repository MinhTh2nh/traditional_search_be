const express = require("express");
const router = express.Router();
const adminProductController = require("../controller/adminproduct");

/**
 * @openapi
 * /api/admin-product:
 *   get:
 *     summary: Get all admin products
 *     description: Retrieve a list of all admin products.
 *     responses:
 *       '200':
 *         description: A list of admin products
 *       '500':
 *         description: Error getting admin products
 *     tags:
 *       - Admin Product
 *
 *   post:
 *     summary: Add a new admin product
 *     description: Add a new product to the admin panel.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             // Define properties for adding an admin product
 *     responses:
 *       '201':
 *         description: Admin product successfully added
 *       '400':
 *         description: Invalid request payload or missing required fields
 *       '500':
 *         description: Error adding an admin product
 *     tags:
 *       - Admin Product
 */

/**
 * @openapi
 * /api/admin-product/{id}:
 *   get:
 *     summary: Get admin product by ID
 *     description: Retrieve a specific admin product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the admin product to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The requested admin product
 *       '404':
 *         description: Admin product not found
 *       '500':
 *         description: Error getting admin product by ID
 *     tags:
 *       - Admin Product
 *
 *   put:
 *     summary: Update admin product by ID
 *     description: Update a specific admin product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the admin product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             // Define properties to update for the admin product
 *     responses:
 *       '200':
 *         description: Admin product updated successfully
 *       '400':
 *         description: Invalid request payload or missing required fields
 *       '404':
 *         description: Admin product not found
 *       '500':
 *         description: Error updating admin product by ID
 *     tags:
 *       - Admin Product
 *
 *   delete:
 *     summary: Delete admin product by ID
 *     description: Delete a specific admin product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the admin product to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Admin product deleted successfully
 *       '404':
 *         description: Admin product not found
 *       '500':
 *         description: Error deleting admin product by ID
 *     tags:
 *       - Admin Product
 *
 *   patch:
 *     summary: Add color to admin product
 *     description: Add a new color option to a specific admin product.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the admin product to update with a new color
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             // Define properties to add a new color to the admin product
 *     responses:
 *       '200':
 *         description: Color added successfully to the admin product
 *       '400':
 *         description: Invalid request payload or missing required fields
 *       '404':
 *         description: Admin product not found
 *       '500':
 *         description: Error adding color to admin product
 *     tags:
 *       - Admin Product
 */



router.get("/admin-product", adminProductController.getAll);
router.get("/admin-product/:id", adminProductController.getOne);
router.post("/admin-product", adminProductController.addProduct);
router.post("/admin-product/export", adminProductController.exportProduct);
router.put("/admin-product/:id/update", adminProductController.updateProduct);
router.delete("/admin-product/:id", adminProductController.deleteProduct);
router.patch("/admin-product/:id/color", adminProductController.addColor);

module.exports = router;
