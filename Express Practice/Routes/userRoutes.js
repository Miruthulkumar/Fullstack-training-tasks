import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

// const users = require("./userSchema");
import users from "../userSchema.js";

//add user
router.post("/usercreation", async (req, res) => {
  const newUser = await users.create(req.body);
  res.status(200).json(newUser);
});

//update user
router.put("/update/:id", async (req, res) => {
  const updateUser = await users.findOneAndUpdate(
    { userId: req.params.id },
    req.body,
    { new: true }
  );
  res.status(200).json(updateUser);
});

//get all users
router.get("/", async (req, res) => {
  const allUsers = await users.find();
  res.status(200).json(allUsers);
});

//find by id
router.get("/userid/:id", async (req, res) => {
  const findById = await users.findOne({ userId: req.params.id });
  res.status(200).json(findById);
});

//find by role
router.get("/role/:role", async (req, res) => {
  const findByRole = await users.find({ role: req.params.role });
  res.status(200).json(findByRole);
});

//delete user
router.delete("/delete/:id", async (req, res) => {
  const deleteUser = await users.findOneAndDelete({ userId: req.params.id });
  res.status(200).send("User Deleted Successfully");
});

//login authentication
router.post("/login", (req, res) => {
  return;
});

//handling invalid endpoints gracefully
router.use((req, res) => {
  res.status(404).send("Page not found");
});

export default router;
