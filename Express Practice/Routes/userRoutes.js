import express from "express";
const router = express.Router;

// const users = require("./userSchema");
import users from "./userSchema.js";

//add user
router.post("/usercreation", async (req, res) => {
  const newUser = await users.create(req.body);
  res.status(200).json(newUser);
});

//get all users
router.get("/users", async (req, res) => {
  const allUsers = await users.find();
  res.status(200).json(allUsers);
});

//find by id
router.get("/users/userid/:id", async (req, res) => {
  const findById = await users.findOne({ userId: req.params.id });
  res.status(200).json(findById);
});

//find by role
router.get("/users/role/:role", async (req, res) => {
  const findByRole = await users.find({ role: req.params.role });
  res.status(200).json(findByRole);
});

//handling invalid endpoints gracefully
router.use((req, res) => {
  res.status(404).send("Page not found");
});

export default router