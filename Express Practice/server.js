// const express = require("express");
import express from "express"; //can be used after adding the type:"module" in package.json [Thanks Sanjai!]
const app = express();
const PORT = 6069;

app.use(express.json());

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
