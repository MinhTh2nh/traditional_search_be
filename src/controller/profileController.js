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
exports.ListAllProfile = async (req, res) => {
  const result = await User.find();
  if (!result) {
    return res.status(404).json({ message: "User not found." });
  }
  return res.status(200).json(result);
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

exports.AddNewUser = async (req, res) => {
  try {
    const { firstname, lastname, phone, address, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }
    bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing the password:', err);
        return res.status(500).json({ message: 'Error registering the user.' });
      }
      const newUser = new User({
        name: `${firstname} ${lastname}`, 
        phone,
        address,
        email,
        password: hashedPassword, 
      });
      await newUser.save();
      return res.status(201).json({
        message: 'User registered successfully.',
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          address: newUser.address,
        },
      });
    });
  } catch (error) {
    console.error('Error registering the user:', error);
    return res.status(500).json({ message: 'Error registering the user.' });
  }
};


exports.updateProfileById = async (req, res) => {
  const { id } = req.params; // Get the user ID from request parameters
  const { firstname, phone, address, email } = req.body; // Include all fields to be updated
  console.log(firstname);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name: firstname, phone, address, email },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.status(200).json({
      message: 'Profile updated successfully.',
      user: updatedUser,
    });
  } catch (err) {
    console.error('Error updating profile information:', err);
    return res.status(500).json({ message: 'Error updating profile information.' });
  }
};


//Delete a user by username
exports.DeleteProfileByID = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    await User.findByIdAndDelete(id);
    return res.status(200).json({ message: 'User deleted successfully.' });
  } catch (err) {
    console.error('Error deleting user:', err);
    return res.status(500).json({ message: 'Error deleting user.' });
  }
};

