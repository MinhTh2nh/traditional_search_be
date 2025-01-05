const db = require("../config/dbconnect");

exports.getAll = async (req, res) => {
  try {
    const result = await db.queryAsync("SELECT * FROM products");

    if (result.length === 0) {
      return res.status(404).json({ message: "No item found in product." });
    }

    const items = result.map((row) => ({
      id: row.id,
      product_name: row.product_name,
      product_type: row.product_type,
      price: row.price,
      quantity: row.quantity,
      size: row.size,
      color: row.color,
      material: row.material,
      picture_one: row.picture_one,
      picture_two: row.picture_two,
      picture_three: row.picture_three,
    }));

    return res.status(200).json({ items });
  } catch (error) {
    console.error("Error retrieving product: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const itemId = req.params.id;

    const result = await db.queryAsync("Select * from products where id = ?", [
      itemId,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "No item found in product list" });
    }
    const item = {
      id: result[0].id,
      product_name: result[0].product_name,
      product_type: result[0].product_type,
      price: result[0].price,
      quantity: result[0].quantity,
      size: result[0].size,
      color: result[0].color,
      material: result[0].material,
      picture_one: result[0].picture_one,
      picture_two: result[0].picture_two,
      picture_three: result[0].picture_three,
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
      quantity,
      size,
      color,
      material,
      picture_one,
      picture_two,
      picture_three,
    } = req.body;
    if (
      !picture_one ||
      !picture_two ||
      !picture_three ||
      !product_name ||
      !product_type ||
      !price ||
      !quantity ||
      !size ||
      !color ||
      !material
    ) {
      return res
        .status(400)
        .json({ message: "There are some missing fields here." });
    }

    const result = await db.queryAsync(
      "INSERT INTO products (product_name, product_type, price, quantity, size, color,material,picture_one,picture_two,picture_three) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?)",
      [
        product_name,
        product_type,
        price,
        quantity,
        size,
        color,
        material,
        picture_one,
        picture_two,
        picture_three,
      ]
    );

    if (result.affectedRows === 1) {
      return res.status(201).json({ message: "Product added to product list" });
    } else {
      return res
        .status(500)
        .json({ message: "Failed to add product to product list" });
    }
  } catch (error) {
    console.error("Error adding product to the product list", error);
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await db.queryAsync("DELETE FROM products WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product not found in the product list",
      });
    }
    res.status(200).json({
      message: "Product deleted from the product list successfully",
    });
  } catch (error) {
    console.error("Error deleting product in the product list", error);
    return res.status(500).json({
      message: "Internal server error",
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
      size,
      color,
      material,
      picture_one,
      picture_two,
      picture_three,
    } = req.body; // Fix variable names here
    const id = req.params.id;

    if (
      !picture_one ||
      !picture_two ||
      !picture_three ||
      !product_name ||
      !product_type ||
      !price ||
      !quantity ||
      !size ||
      !color ||
      !material
    ) {
      return res
        .status(400)
        .json({ message: "Bad Request. Please provide all required fields." }); // Change status code to 400 for a bad request
    }

    const result = await db.queryAsync(
      "UPDATE products SET product_name = ?, product_type = ?, price = ?, quantity = ?, size = ?, color = ? , material = ?, picture_one = ?, picture_two = ?, picture_three = ? WHERE id = ?",
      [
        product_name,
        product_type,
        price,
        quantity,
        size,
        color,
        material,
        picture_one,
        picture_two,
        picture_three,
        id,
      ]
    );

    if (result.affectedRows === 1) {
      const updatedItem = {
        product_name: product_name,
        product_type: product_type,
        price: price,
        quantity: quantity,
        size: size,
        color: color,
        material: material,
        picture_one: picture_one,
        picture_two: picture_two,
        picture_three: picture_three,
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
