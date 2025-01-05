//loginController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");

require('dotenv').config();

exports.LogInAccount = async (req, res) => {
  const { email, password } = req.body;
  const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const isCheckEmail = reg.test(email);

  if (!email || !password) {
    return res.status(400).json({
      status: "ERR",
      message: "Email and password are required",
    });
  } else if (!isCheckEmail) {
    return res.status(400).json({
      status: "ERR",
      message: "Please provide a valid email",
    });
  }
  // Check the user's username in the database
  const accounts = await User.findOne({ email });
  if (!accounts) {
    return res.status(404).json({
      status: "ERR",
      message: "User not found. Please register first.",
    });
  }
  // Compare provided password with the hashed password
  const match = await bcrypt.compare(password, accounts.password);
  if (!match) {
    // Avoid revealing that the password was incorrect
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const jwtSecret = process.env.JWT_SECRET;
  // Create a token with the user role
  const token = jwt.sign(
    { accountsId: accounts._id, accounts: accounts.email, role: accounts.role },
    jwtSecret, 
    { expiresIn: '24h' }
  );

  // Authentication successful, return the token and user data
  return res.status(200).json({
    message: 'Login successful',
    token: token,
    accounts: {
      id: accounts._id,
      username: accounts.email,
      role: accounts.role,
      name: accounts.name,
      phone: accounts.phone,
      address: accounts.address,
    }
  });
};
