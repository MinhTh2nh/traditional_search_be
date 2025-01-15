const db = require("../config/dbconnect");
const Product = require("../models/product");
const fs = require("fs");
const { parse } = require("json2csv");

exports.getAll = async (req, res) => {
  try {
    const result = await Product.find()
      .select("-reviews")
      .sort({ timestamp: -1 });
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
      total_stock: row.total_stock,
    }));

    return res.status(200).json({ items });
  } catch (error) {
    console.error("Error retrieving items from the product list: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const itemId = req.params.id;
    const result = await Product.findById(itemId)

    if (result.length === 0) {
      return res.status(404).json({ message: "No item found in product list" });
    }

    const item = {
      id: result._id,
      product_name: result.name,
      product_type: result.category,
      price: result.price,
      quantity: result.total_stock,
      size: result.size,
      color: result.color,
      material: result.description,
      picture_one: result.image_url,
      picture_two: result.image_url,
      picture_three: result.image_url,
    };
    return res.status(200).json({ item });
  } catch (error) {
    console.log("Error retrieving item from the product list", error);
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

exports.addProduct = async (req, res) => {
  try {
    const {
      product_name,
      product_type,
      price,
      total_stock,
      size,
      color,
      description,
      image_url,
    } = req.body;
    if (
      !image_url ||
      !product_name ||
      !product_type ||
      !price ||
      !total_stock ||
      !size ||
      !color ||
      !description
    ) {
      return res.status(400).json({ message: "There are some missing fields here." });
    }
    const product_id = Math.floor(Math.random() * 1000000) + 1; // Generate a random product ID

    const newProduct = await Product.create({
      product_id,               // Assign the generated product ID
      product_code: product_id, // Use the same value for product_code
      name: product_name,       // Map product_name to name
      category: product_type,   // Map product_type to category
      price,
      total_stock,
      size,
      color,
      description,
      image_url,
    });
    return res.status(201).json({
      message: "Product added successfully.",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product to the product list:", error);
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};





exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found." });
    }
    return res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      message: "Error deleting product.",
      error: error.message,
    });
  }
};




exports.updateProduct = async (req, res) => {
  try {
    const {
      product_name,
      product_type,
      price,
      quantity,
      color,
      material,
      picture_one,
      picture_two,
      picture_three,
    } = req.body;
    const id = req.params.id;
    console.log(product_name, product_type, price, quantity, color, material, picture_one, picture_two, picture_three);
    if (!id) {
      return res.status(400).json({ message: "Bad Request. Missing product ID." });
    }
    if (
      !picture_one ||
      !picture_two ||
      !picture_three ||
      !product_name ||
      !product_type ||
      !price ||
      !quantity ||
      !color ||
      !material
    ) {
      return res.status(400).json({
        message: "Bad Request. Please provide all required fields.",
      });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: product_name,
        category: product_type,
        price,
        total_stock: quantity,
        color,
        description: material,
        image_url: picture_one,
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    console.log("Error updating product:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.addColor = async (req, res) => {
  try {
    const { color } = req.body; // Fix variable names here
    const id = req.params.id;

    if (!color) {
      return res
        .status(400)
        .json({ message: "Bad Request. Please provide all required fields." }); // Change status code to 400 for a bad request
    }

    const result = await db.queryAsync(
      "UPDATE products SET  color = ? WHERE id = ?",
      [color, id]
    );

    if (result.affectedRows === 1) {
      const updatedItem = {
        color: color,
      };

      return res.status(200).json({
        item: updatedItem,
        message: "Product is updated in product lists.",
      });
    } else {
      return res.status(404).json({
        message: "Product not found in the product lists.",
      });
    }
  } catch (error) {
    console.log("Error updating product", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.exportProduct = async (req, res) => {
  try {
    // Fetch products from the database
    const result = await Product.find().sort({ timestamp: -1 });
    if (result.length === 0) {
      return res.status(404).json({ message: "No item found in product list" });
    }

    // Map products to match the desired CSV structure
    const items = result.map((row) => ({
      name: row.name,
      price: row.price,
      category: row.category,
      product_code: row.product_code,
      color: row.color,
      product_id: row.product_id,
      description: row.description,
      index_name: row.index_name || "",
      total_stock: row.total_stock,
      sold_count: row.sold_count,
      review_count: row.review_count,
      rating_count: row.rating_count,
      avg_rating: row.avg_rating,
      image_url: row.image_url,
    }));

    // Convert the data to CSV format
    const csv = parse(items, {
      fields: [
        "name",
        "price",
        "category",
        "product_code",
        "color",
        "product_id",
        "description",
        "index_name",
        "total_stock",
        "sold_count",
        "review_count",
        "rating_count",
        "avg_rating",
        "image_url",
      ],
    });

    // Define file name and path
    const filePath = "./exported_products.csv";

    // Write CSV data to file
    fs.writeFileSync(filePath, csv);

    // Respond with the file for download
    res.setHeader("Content-Disposition", `attachment; filename=products.csv`);
    res.setHeader("Content-Type", "text/csv");
    return res.status(200).send(csv);
  } catch (error) {
    console.error("Error exporting product data: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};