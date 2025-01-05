const db = require("../config/dbconnect");
const Product = require("../models/product");

exports.getAll = async (req, res) => {
  try {
    const result = await Product.find()
      .select("-reviews");

    if (result.length === 0) {
      return res.status(404).json({ message: "No item found in product list" });
    }

    const items = result.map((row) => ({
      id: row._id,
      product_name: row.name,
      product_type: row.category,
      price: row.price,
      color: row.color,
      size: "XL",
      material: row.description,
      picture_one: row.image_url,
      picture_two: row.image_url,
      picture_three: row.image_url,
    }));

    return res.status(200).json({ items });
  } catch (error) {
    console.error("Error retrieving items from the product list: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};


exports.searchName = async (req, res) => {
  try {
    const encodedProductName = req.params.product_name;
    const decodedProductName = decodeURIComponent(encodedProductName);
    console.log(decodedProductName);
    // Perform a full-text search in MongoDB
    const results = await Product.find(
      { $text: { $search: decodedProductName } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    console.log(results);

    if (!results) {
      return res.status(404).json({ message: "Item not found in the product" });
    }

    // Map the result to the desired format
    const items = results.map(product => ({
      id: product._id,
      product_id: product.product_id,
      product_name: product.name,
      product_type: product.category,
      price: product.price,
      color: product.color,
      size: product.size || "N/A",
      material: product.description,
      picture_one: product.image_url,
      picture_two: product.image_url,
      picture_three: product.image_url,
    }));

    return res.status(200).json({ items });
  } catch (error) {
    console.error("Error retrieving item from the product", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};