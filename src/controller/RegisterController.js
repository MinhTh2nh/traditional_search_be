// controllers/signupController.js
const bcrypt = require('bcrypt');
const User = require("../models/user");
const saltRounds = 10; // Adjust the number of salt rounds as needed
exports.RegisterAccount = async (req, res) => {
  try {
    const { firstname, lastname, phone, address, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "ERR",
        message: "The email is already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      name: `${firstname} ${lastname}`,
      phone,
      address,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      status: "OK",
      message: "User successfully registered.",
      accountsId: newUser._id,
    });
  } catch (err) {
    console.error('Error registering the user:', err);
    return res.status(500).json({
      status: "ERR",
      message: "An error occurred while registering the user.",
    });
  }
};
