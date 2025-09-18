const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  role: { type: String, enum: ["Admin", "Member", "Guest"] },
});

module.exports = mongoose.model("user", userSchema);
