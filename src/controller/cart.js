const db = require("../config/dbconnect");
const Cart = require("../models/cart");

exports.getAll = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const cart = await Cart.findOne({ userId: userId });
    if (cart && cart.items.length > 0) {
      // Calculate total money for each item in the cart and add id
      const itemsWithId = cart.items.map((item) => {
        const newItem = { ...item.toObject() };  // Ensure item is a plain object
        newItem.totalmoney = newItem.price * newItem.quantity;
        newItem.id = newItem._id;  // Add id field to item
        delete newItem._id;  // Optionally remove the original _id if you want the field to be named "id" only
        return newItem;
      });

      return res.status(200).json({ items: itemsWithId, data: true });
    } else {
      return res.status(404).json({ message: "Cart is empty", data: false });
    }
  } catch (error) {
    console.error("Error fetching cart items", error);
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

exports.addOne = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const { name, price, type, quantity, size, color } = req.body;
    if (!userId || !name || !price || !quantity || !color || !size) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    const cartItem = {
      name,
      price,
      type,
      quantity,
      size,
      color
    };
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId,
        items: [cartItem]
      });
    } else {
      cart.items.push(cartItem);
    }
    await cart.save();
    return res.status(201).json({
      cart_id: cart._id,
      message: "Product added to cart successfully.",
      cart_items: cart.items
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const productId = req.body.productId;
    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }
    const itemIndex = cart.items.findIndex((item) => item._id.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({
        message: "Product not found in the cart",
      });
    }
    cart.items.splice(itemIndex, 1);
    // Save the updated cart
    await cart.save();
    return res.status(200).json({
      message: "Product deleted from the cart successfully",
    });
  } catch (error) {
    console.error("Error deleting product from the cart:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.updateOne = async (req, res) => {
  try {
    const { quantity, size, color } = req.body;
    const { id, user_id } = req.params;

    // Validate the input data
    if (!quantity || !size || !color) {
      return res.status(400).json({ message: "Bad request." });
    }

    // Find the cart for the user and update the item
    const cart = await Cart.findOne({ userId: user_id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item by productId and update it
    const itemIndex = cart.items.findIndex((item) => item._id.toString() === id);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }

    // Update the item
    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].size = size;
    cart.items[itemIndex].color = color;

    // Save the updated cart
    await cart.save();

    return res.status(200).json({
      item: cart.items[itemIndex],
      message: "Product is updated in cart",
    });
  } catch (error) {
    console.log("Error updating product", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getuser = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.queryAsync("SELECT id FROM accounts WHERE id = ?", [
      id,
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "No user found in user list" });
    }

    const items = {
      id: result[0].id,
    };

    return res.status(200).json({ items });
  } catch (error) {
    console.error("Error retrieving user from the user list: ", error);
    return res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};
