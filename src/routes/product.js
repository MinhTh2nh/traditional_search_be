// src/routes/product.js
const express = require("express");
const router = express.Router();
const productControllers = require("../controller/product");

/**
 * @openapi
 * /api/product:
 *   get:
 *     summary: Get all products
 *     description: Retrieve all products available.
 *     responses:
 *       '200':
 *         description: List of products successfully retrieved.
 *       '500':
 *         description: Error retrieving the list of products.
 *     tags:
 *       - Products
 */

router.get("/product", productControllers.getAll);
router.get("/product/productdetail/:product_name", productControllers.searchName);
module.exports = router;
