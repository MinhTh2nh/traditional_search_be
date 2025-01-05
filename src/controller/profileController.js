// controllers/profileController.js
const db = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require("../models/user");

exports.getProfileByID = async (req, res) => {
  try {
    const id = req.params.id; // Get the user ID from request parameters
    const result = await User.findById(id);

    if (!result) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving user profile", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


exports.editProfile = async (req, res) => {
  const id = req.params.id;

  // Find the user by ID in the MongoDB database
  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const { firstname, lastname, phone, address, email } = req.body;

  try {
    // Update the user's profile with the new data
    user.name = `${firstname} ${lastname}`;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.email = email || user.email;
    // Save the updated user profile
    await user.save();
    return res.status(200).json({ message: 'User profile updated successfully.' });
  } catch (err) {
    console.error('Error updating profile:', err);
    return res.status(500).json({ message: 'Error updating profile.' });
  }
};

// New function to list all users
exports.ListAllProfile = (req, res) => {
  db.query('SELECT id,firstname, lastname, phone,address,email FROM accounts', (err, results) => {
    if (err) {
      console.error('Error retrieving user list:', err);
      return res.status(500).json({ message: 'Error retrieving user list.' });
    }
    if (results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ message: 'No users found.' });
    }
  });
};

exports.ViewProfileByID = (req, res) => {
  const id = req.params.id; // Get the username from request parameters

  db.query('SELECT id, firstname, lastname, phone, email,address FROM accounts WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error retrieving profile information:', err);
      return res.status(500).json({ message: 'Error retrieving profile information.' });
    }
    if (result.length > 0) {
      const profile = result[0];
      return res.status(200).json(profile);
    } else {
      return res.status(404).json({ message: 'User not found.' });
    }
  });
};

exports.AddNewUser = (req, res) => {
  // Extract the user details from the request body
  const { id, firstname, lastname, phone, address, email, password } = req.body;
  console.log(req.body);
  // Hash the password before saving it to the database
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing the password:', err);
      return res.status(500).json({ message: 'Error registering the user.' });
    }

    // Construct the SQL query to insert a new user
    const query = 'INSERT INTO accounts (id ,firstname,lastname, phone,address,email,password) VALUES (?,?, ?, ?, ?,?,?)';
    const values = [id, firstname, lastname, phone, address, email, hashedPassword];

    // Execute the query
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error adding new user:', err);
        return res.status(500).json({ message: 'Error adding new user.' });
      }

      // If the user was successfully added, send back a success message
      // You might also want to send back the ID of the new user, but be careful not to expose sensitive information
      return res.status(201).json({ message: 'New user added successfully.' });
    });
  });
};

exports.updateProfileById = (req, res) => {
  const id = req.params.id; // Get the user ID from request parameters
  const { firstname, lastname, phone, address, email } = req.body; // Include all fields you want to update

  // Assume validation and sanitization have been done
  const query = 'UPDATE accounts SET firstname = ?, lastname = ?, phone = ?, address = ?, email = ? WHERE id = ?';
  const values = [firstname, lastname, phone, address, email, id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating profile information:', err);
      return res.status(500).json({ message: 'Error updating profile information.' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Return a message that the profile was updated successfully
    return res.status(200).json({ message: 'Profile updated successfully.' });
  });
};


//Delete a user by username
exports.DeleteProfileByID = (req, res) => {
  const { id } = req.params; // assuming you pass the product name as a URL parameter

  db.query('DELETE FROM accounts WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).json({ message: 'Error deleting user.' });
    }
    if (result.affectedRows === 0) {
      // If no rows are affected, it means the user was not found
      return res.status(404).json({ message: 'User not found.' });
    }

    // If the user was successfully deleted, send back a success message
    return res.status(200).json({ message: 'User deleted successfully.' });
  });
};
