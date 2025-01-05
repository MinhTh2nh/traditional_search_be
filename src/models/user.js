const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  isAdmin: { type: Boolean, default: false },
  phone: { type: Number, default: 0 },
  avatar: { type: String, default: "" },
  order_lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders", // Match the registered model name
      default: [],
    },
  ],
  address: { type: String, default: "" },
  role: { type: String, default: "Admin" },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
