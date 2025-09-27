// const mongoose = require("mongoose");
import mongoose from "mongoose";
import env from "dotenv";
env.config();

async function connectDb() {
  const connect = await mongoose.connect(process.env.MongoDB_URL);
  console.log("Database connected successfully ✅");
}

// module.exports(connectDb);
export default connectDb;
