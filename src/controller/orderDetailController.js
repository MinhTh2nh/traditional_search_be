const db = require('../db');

exports.getAllOrderDetail = (req, res) => {
  db.query('SELECT * FROM `orderdetail`', (err, results) => {
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

exports.getOrderDetailByID = (req, res) => {
    const orderID = req.params.orderID; // Get the orderID from request parameters
  
    db.query('SELECT * FROM `orderdetail` WHERE orderID = ?', [orderID], (err, result) => {
      console.log(result);
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

  exports.updateOrderDetailByID = (req, res) => {
    const orderID = req.params.orderID; // Get the order ID from request parameters
    const { productname, type, size, color,quantity} = req.body; // Include all fields you want to update
    // Assume validation and sanitization have been done
    const query = 'UPDATE `orderdetail` SET productname = ?, type = ?, size = ?, color = ?, quantity = ? WHERE orderID = ?';
    const values = [productname, type, size, color,quantity, orderID];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error updating order details:', err);
        return res.status(500).json({ message: 'Error updating order details.' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Order detail not found.' });
      }
  
      // Return a message that the order was updated successfully
      return res.status(200).json({ message: 'Order detail updated successfully.' });
    });
  };
  
  exports.DeleteOrderDetailByID = (req, res) => {
    const { orderID } = req.params; // Get the order ID from request parameters

    db.query('DELETE FROM `orderdetail` WHERE orderID = ?', [orderID], (err, result) => {
      if (err) {
        console.error('Error deleting order:', err);
        return res.status(500).json({ message: 'Error deleting orderdetail.' });
      }
      if (result.affectedRows === 0) {
        // If no rows are affected, it means the order was not found
        return res.status(404).json({ message: 'Order not found.' });
      }
  
      // If the order was successfully deleted, send back a success message
      return res.status(200).json({ message: 'Order deleted successfully.' });
    });
  };
  
  exports.InsertNewOrderDetail = (req, res) => {
    const { orderID, product} = req.body; // Extract order details from request body
    console.log(req.body)
    
   const insertQuery = 'INSERT INTO `orderdetail` (orderID, productID, productname, type, size, price, color, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [orderID, product.id, product.product_name, product.product_type, product.size, product.price, product.color,product.quantity];
    
    db.query(insertQuery, values, (err, result) => {
      if (err) {
        console.error('Error inserting order detail:', err);
        return res.status(500).json({ message: 'Error inserting order detail.' });
      }
  
      // Successful insertion, return the newly inserted order detail ID or any other response as needed
      const orderDetailId = result.insertId;
      return res.status(201).json({ orderDetailId, message: 'Order detail successfully inserted.' });
    });
  };

  



