const db = require('../db');
const Order = require("../models/Order");

exports.getAllOrders = (req, res) => {
  db.query('SELECT * FROM `order`', (err, results) => {
    if (err) {
      console.error('Error retrieving orders:', err);
      return res.status(500).json({ message: 'Error retrieving orders.' });
    }
    if (results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ message: 'No orders found.' });
    }
  });
};

exports.getOrderByID = (req, res) => {
  const orderID = req.params.orderID; // Get the orderID from request parameters

  db.query('SELECT * FROM `order` WHERE orderID = ?', [orderID], (err, result) => {
    if (err) {
      console.error('Error retrieving order information:', err);
      return res.status(500).json({ message: 'Error retrieving order information.' });
    }
    if (result.length > 0) {
      const order = result;
      return res.status(200).json(order);
    } else {
      return res.status(404).json({ message: 'Order not found.' });
    }
  });
};

exports.updateOrderByID = (req, res) => {
  const orderID = req.params.orderID; // Get the order ID from request parameters
  const { firstname, lastname, phone, address, email } = req.body; // Include all fields you want to update
  // Assume validation and sanitization have been done
  const query = 'UPDATE `order` SET firstname = ?, lastname = ?, phone = ?, address = ?, email = ? WHERE orderID = ?';
  const values = [firstname, lastname, phone, address, email, orderID];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating order details:', err);
      return res.status(500).json({ message: 'Error updating order details.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    // Return a message that the order was updated successfully
    return res.status(200).json({ message: 'Order updated successfully.' });
  });
};

exports.DeleteOrderByID = (req, res) => {
  const { orderID } = req.params; // Get the order ID from request parameters

  db.beginTransaction((err) => {
    if (err) {
      console.error('Error starting transaction:', err);
      return res.status(500).json({ message: 'Error starting transaction.' });
    }

    db.query('DELETE FROM `order` WHERE orderID = ?', [orderID], (err, result) => {
      if (err) {
        console.error('Error deleting order:', err);
        return db.rollback(() => {
          res.status(500).json({ message: 'Error deleting order.' });
        });
      }

      if (result.affectedRows === 0) {
        return db.rollback(() => {
          res.status(404).json({ message: 'Order not found.' });
        });
      }

      db.query('DELETE FROM `orderdetail` WHERE orderID = ?', [orderID], (err, result) => {
        if (err) {
          console.error('Error deleting orderdetail:', err);
          return db.rollback(() => {
            res.status(500).json({ message: 'Error deleting orderdetail.' });
          });
        }

        db.commit((err) => {
          if (err) {
            console.error('Error committing transaction:', err);
            return db.rollback(() => {
              res.status(500).json({ message: 'Error committing transaction.' });
            });
          }

          return res.status(200).json({ message: 'Order and associated details deleted successfully.' });
        });
      });
    });
  });
};

exports.InsertNewOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, paymentMethod, shipping_address, fullName, phoneNumber } = req.body;
    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      paymentMethod,
      shipping_address,
      fullName,
      phoneNumber,
    });
    await newOrder.save();
    return res.status(201).json({
      message: "Order successfully created.",
      orderId: newOrder._id, // Return the created order ID
    });
  } catch (error) {
    console.error("Error inserting order:", error);
    return res.status(500).json({ message: "Error inserting order." });
  }
};




