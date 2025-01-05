const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const { verifyToken } = require('../middleware/authMiddleware');

/**
 * @openapi
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve a list of all orders.
 *     responses:
 *       '200':
 *         description: A list of orders
 *       '500':
 *         description: Error getting orders
 *     tags:
 *       - Orders
 */

/**
 * @openapi
 * /api/orders/{orderID}:
 *   get:
 *     summary: Get order by ID
 *     description: Retrieve a specific order by its ID.
 *     parameters:
 *       - in: path
 *         name: orderID
 *         required: true
 *         description: ID of the order to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The requested order
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Error getting order by ID
 *     tags:
 *       - Orders
 *
 *   put:
 *     summary: Update order by ID
 *     description: Update a specific order by its ID.
 *     parameters:
 *       - in: path
 *         name: orderID
 *         required: true
 *         description: ID of the order to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             // Define properties to update
 *     responses:
 *       '200':
 *         description: Order updated successfully
 *       '400':
 *         description: Invalid request payload or missing required fields
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Error updating order by ID
 *     tags:
 *       - Orders
 *
 *   delete:
 *     summary: Delete order by ID
 *     description: Delete a specific order by its ID.
 *     parameters:
 *       - in: path
 *         name: orderID
 *         required: true
 *         description: ID of the order to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Order deleted successfully
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Error deleting order by ID
 *     tags:
 *       - Orders
 *
 * @openapi
 * /api/orders:
 *   post:
 *     summary: Insert a new order
 *     description: Insert a new order.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             // Define properties for inserting a new order
 *     responses:
 *       '201':
 *         description: Order successfully inserted
 *       '400':
 *         description: Invalid request payload or missing required fields
 *       '500':
 *         description: Error inserting new order
 *     tags:
 *       - Orders
 */



router.get('/', orderController.getAllOrders);
router.get('/:orderID',orderController.getOrderByID)
router.put('/:orderID',verifyToken, orderController.updateOrderByID)
router.delete('/:orderID',verifyToken, orderController.DeleteOrderByID)
router.post('/add',verifyToken, orderController.InsertNewOrder)
module.exports = router;