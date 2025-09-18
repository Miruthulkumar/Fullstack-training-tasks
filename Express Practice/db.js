// const mongoose = require("mongoose");
import mongoose from "mongoose";

async function connectDb() {
  const connect = await mongoose.connect(
    "mongodb+srv://miruthul:IyLBTWLHTjq9BGmc@cluster0.avtwclw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("Database connected successfully ✅");
}

// module.exports(connectDb);
export default connectDb;
