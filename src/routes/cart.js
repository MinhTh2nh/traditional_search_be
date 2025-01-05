// routes/cart.js

const express = require("express");
const router = express.Router();
const cartControllers = require("../controller/cart");

/**
 * @openapi
 * /api/cart:
 *   get:
 *     summary: Get all cart items
 *     description: Retrieve a list of all items in the cart.
 *     responses:
 *       '200':
 *         description: A list of cart items
 *       '500':
 *         description: Error getting cart items
 *     tags:
 *       - Cart
 *
 *   post:
 *     summary: Add item to cart
 *     description: Add a new item to the cart.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             // Define properties for adding an item to the cart
 *     responses:
 *       '201':
 *         description: Item successfully added to the cart
 *       '400':
 *         description: Invalid request payload or missing required fields
 *       '500':
 *         description: Error adding item to the cart
 *     tags:
 *       - Cart
 */

/**
 * @openapi
 * /api/cart/{id}:
 *   get:
 *     summary: Get cart item by ID
 *     description: Retrieve a specific item in the cart by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cart item to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The requested cart item
 *       '404':
 *         description: Cart item not found
 *       '500':
 *         description: Error getting cart item by ID
 *     tags:
 *       - Cart
 *
 *   put:
 *     summary: Update cart item by ID
 *     description: Update a specific item in the cart by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cart item to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             // Define properties to update for the cart item
 *     responses:
 *       '200':
 *         description: Cart item updated successfully
 *       '400':
 *         description: Invalid request payload or missing required fields
 *       '404':
 *         description: Cart item not found
 *       '500':
 *         description: Error updating cart item by ID
 *     tags:
 *       - Cart
 *
 *   delete:
 *     summary: Delete cart item by ID
 *     description: Delete a specific item in the cart by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cart item to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Cart item deleted successfully
 *       '404':
 *         description: Cart item not found
 *       '500':
 *         description: Error deleting cart item by ID
 *     tags:
 *       - Cart
 */

/**
 * @openapi
 * /api/cart:
 *   get:
 *     summary: Get all cart items
 *     description: Retrieve a list of all items in the cart.
 *     responses:
 *       '200':
 *         description: A list of cart items
 *       '500':
 *         description: Error getting cart items
 *     tags:
 *       - Cart
 *
 *   post:
 *     summary: Add item to cart
 *     description: Add a new item to the cart.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             // Define properties for adding an item to the cart
 *     responses:
 *       '201':
 *         description: Item successfully added to the cart
 *       '400':
 *         description: Invalid request payload or missing required fields
 *       '500':
 *         description: Error adding item to the cart
 *     tags:
 *       - Cart
 */

/**
 * @openapi
 * /api/cart/{id}:
 *   get:
 *     summary: Get cart item by ID
 *     description: Retrieve a specific item in the cart by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cart item to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The requested cart item
 *       '404':
 *         description: Cart item not found
 *       '500':
 *         description: Error getting cart item by ID
 *     tags:
 *       - Cart
 *
 *   put:
 *     summary: Update cart item by ID
 *     description: Update a specific item in the cart by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cart item to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             // Define properties to update for the cart item
 *     responses:
 *       '200':
 *         description: Cart item updated successfully
 *       '400':
 *         description: Invalid request payload or missing required fields
 *       '404':
 *         description: Cart item not found
 *       '500':
 *         description: Error updating cart item by ID
 *     tags:
 *       - Cart
 *
 *   delete:
 *     summary: Delete cart item by ID
 *     description: Delete a specific item in the cart by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cart item to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Cart item deleted successfully
 *       '404':
 *         description: Cart item not found
 *       '500':
 *         description: Error deleting cart item by ID
 *     tags:
 *       - Cart
 */

router.get("/cart/:user_id", cartControllers.getAll);
router.post("/cart/:user_id", cartControllers.addOne);
router.delete("/cart/delete/:user_id", cartControllers.deleteOne);
router.put("/cart/update/:id/:user_id", cartControllers.updateOne);
router.get("/user/:id", cartControllers.getuser);

module.exports = router;
