// const express = require("express");
import express from "express"; //can be used after adding the type:"module" in package.json [Thanks Sanjai!]
const app = express();
const PORT = 6069;

// const connectDb = require("./db");
import connectDb from "./db.js";
connectDb();

// const users = require("./userSchema");
import users from "./userSchema.js";

app.use(express.json());

//returns hello world
app.get("/home", (req, res) => {
  res.status(200).send("Hello, World!");
});

//returns Heelo (username)
app.get("/home/user/:name", (req, res) => {
  const userName = req.params.name;
  res.status(200).send(`Hello, ${userName}`);
});

//returns payload json back to user
app.post("/home/post", (req, res) => {
  const userData = req.body;
  res.status(200).json(userData);
});

//add user
app.post("/usercreation", async (req, res) => {
  const newUser = await users.create(req.body);
  res.status(200).json(newUser);
});

//get all users
app.get("/users", async (req, res) => {
  const allUsers = await users.find();
  res.status(200).json(allUsers);
});

//find by id
app.get("/users/userid/:id", async (req, res) => {
  const findById = await users.findOne({ userId: req.params.id });
  res.status(200).json(findById);
});

//find by role
app.get("/users/role/:role", async (req, res) => {
  const findByRole = await users.find({ role: req.params.role });
  res.status(200).json(findByRole);
});

//handling invalid endpoints gracefully
app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`The server is running at port ${PORT} ✅`);
});
