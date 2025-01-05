const db = require("../config/dbconnect");
const Product = require("../models/product");

exports.getOne = async (req, res) => {
  try {
    // Ensure the database connection is established before using it
    const id = req.params.id;
    const result = await Product.findById(id);
    // Use explicit join syntax in the SQL query
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Verify that the column names in the result object match the actual column names
    const item = {
      id: result._id,
      product_name: result.name, // Assuming 'name' is the correct column name
      product_type: result.category,
      price: result.price,
      color: result.color,
      size: result.size || "N/A",
      material: result.description,
      picture_one: result.image_url,
      picture_two: result.image_url,
      picture_three: result.image_url,
    };

    return res.status(200).json({ item });
  } catch (error) {
    console.log("Error retrieving item from the product", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
