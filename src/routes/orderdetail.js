const express = require('express');
const router = express.Router();
const orderDetailController = require('../controller/orderDetailController');

/**
 * @openapi
 * /api/orderdetails:
 *   get:
 *     summary: Get all order details
 *     description: Retrieve a list of all order details.
 *     responses:
 *       '200':
 *         description: A list of order details
 *       '500':
 *         description: Error getting order details
 *     tags:
 *       - OrderDetails
 */

/**
 * @openapi
 * /api/orderdetails/{orderID}:
 *   get:
 *     summary: Get order detail by ID
 *     description: Retrieve a specific order detail by its ID.
 *     parameters:
 *       - in: path
 *         name: orderID
 *         required: true
 *         description: ID of the order detail to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: The requested order detail
 *       '404':
 *         description: Order detail not found
 *       '500':
 *         description: Error getting order detail by ID
 *     tags:
 *       - OrderDetails
 *
 *   put:
 *     summary: Update order detail by ID
 *     description: Update a specific order detail by its ID.
 *     parameters:
 *       - in: path
 *         name: orderID
 *         required: true
 *         description: ID of the order detail to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define properties to update
 *     responses:
 *       '200':
 *         description: Order detail updated successfully
 *       '400':
 *         description: Invalid request payload or missing required fields
 *       '404':
 *         description: Order detail not found
 *       '500':
 *         description: Error updating order detail by ID
 *     tags:
 *       - OrderDetails
 *
 *   delete:
 *     summary: Delete order detail by ID
 *     description: Delete a specific order detail by its ID.
 *     parameters:
 *       - in: path
 *         name: orderID
 *         required: true
 *         description: ID of the order detail to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Order detail deleted successfully
 *       '404':
 *         description: Order detail not found
 *       '500':
 *         description: Error deleting order detail by ID
 *     tags:
 *       - OrderDetails
 *
 * @openapi
 * /api/orderdetails:
 *   post:
 *     summary: Insert a new order detail
 *     description: Insert a new order detail.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             // Define properties for inserting a new order detail
 *     responses:
 *       '201':
 *         description: Order detail successfully inserted
 *       '400':
 *         description: Invalid request payload or missing required fields
 *       '500':
 *         description: Error inserting new order detail
 *     tags:
 *       - OrderDetails
 */

router.get('/', orderDetailController.getAllOrderDetail);
router.get('/:orderID',orderDetailController.getOrderDetailByID);
router.put('/:orderID',orderDetailController.updateOrderDetailByID);
router.delete('/:orderID',orderDetailController.DeleteOrderDetailByID);
router.post('/',orderDetailController.InsertNewOrderDetail)
module.exports = router;