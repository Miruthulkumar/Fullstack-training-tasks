// const mongoose = require("mongoose");
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Admin", "Member", "Guest"] },
});

// module.exports = mongoose.model("user", userSchema);
export default mongoose.model("user", userSchema);
