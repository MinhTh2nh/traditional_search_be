// src/routes/product.js
const express = require("express");
const router = express.Router();
const productDetailControllers = require("../controller/productdetail");
const productControllers = require("../controller/product");

/**
 * @openapi
 * /api/productdetail/{id}:
 *   get:
 *     summary: Get product details by ID
 *     description: Retrieve product details based on the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve details for.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Product details successfully retrieved.
 *       '404':
 *         description: Product not found for the given ID.
 *       '500':
 *         description: Error retrieving the product details.
 *     tags:
 *       - Product Detail
 */

router.get("/productdetails/:id", productDetailControllers.getOne);
router.get("/productdetail/:product_name", productControllers.searchName);

module.exports = router;
