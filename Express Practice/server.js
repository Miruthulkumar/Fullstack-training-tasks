// const express = require("express");
import express from "express"; //can be used after adding the type:"module" in package.json [Thanks Sanjai!]
import logTimestamp from "./middleware/logTimestamp.js";
const app = express();
const PORT = 5000;

//middleware to use json
app.use(express.json());

//calling timestamp middleware
app.use(logTimestamp);

// const connectDb = require("./db");
import connectDb from "./db.js";
connectDb();

//importing home router
import bookRoutes from "./Routes/homeRoutes.js";
app.use("/home", bookRoutes);

// importing user router
import userRoutes from "./Routes/userRoutes.js";
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`The server is running at port ${PORT} ✅`);
});