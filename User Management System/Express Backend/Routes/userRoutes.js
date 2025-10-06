import express from "express";
import checkRole from "../middleware/authrole.js";
const router = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//env config for secket key
import env, { parse } from "dotenv";
env.config();

// const users = require("./userSchema");
import users from "../userSchema.js";

// login endpoint
router.post("/login", async (req, res) => {
  try {
    const { userId, password } = req.body;

    // check if user exists
    const found = await users.findOne({ userId: userId });
    if (!found) {
      return res.status(404).send("User not found");
    }

    // check password with bcrypt
    const isMatch = await bcrypt.compare(password, found.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    // create JWT
    const token = jwt.sign(
      { userId: found.userId, role: found.role },
      process.env.SecretKey_URL,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Apply checkRole middleware to all routes below
router.use(checkRole());

//add user with input validation and safe bcrypt hashing
router.post("/usercreation", async (req, res) => {
  try {
    const usersArray = req.body; // expecting an array of user objects

    if (!Array.isArray(usersArray) || usersArray.length === 0) {
      return res.status(400).json({ error: "Request body must be a non-empty array" });
    }

    const createdUsers = [];

    for (let user of usersArray) {
      const username = user.username?.trim();
      const userId = user.userId?.trim();
      const password = user.password?.trim();
      const role = user.role?.trim();

      if (!username || !userId || !password || !role) {
        return res.status(400).json({ error: "All fields are required for each user" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await users.create({
        username,
        userId,
        password: hashedPassword,
        role,
      });

      createdUsers.push(newUser);
    }

    res.status(201).json({ message: "Users created successfully", users: createdUsers });
  } catch (err) {
    console.error("Error creating users:", err);
    res.status(500).json({ error: err.message });
  }
});

//update user
router.put("/update/:id", async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updateUser = await users.findOneAndUpdate(
      { userId: req.params.id },
      req.body,
      { new: true }
    );

    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get all users
router.get("/", async (req, res) => {
  try {
    const allUsers = await users.find();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//find by id
router.get("/userid/:id", async (req, res) => {
  try {
    const findById = await users.findOne({ userId: req.params.id });
    if (!findById) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(findById);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//limit offset pagination...
router.get("/userid/:start/:end", async (req, res) => {
  try {
    const start = parseInt(req.params.start);
    const end = parseInt(req.params.end);

    const userList = await users
      .find()
      .skip(start)
      .limit(end - start);

    res.status(200).json(userList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//find by role
router.get("/role/:role", async (req, res) => {
  try {
    const findByRole = await users.find({ role: req.params.role });
    res.status(200).json(findByRole);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//delete user
router.delete("/delete/:id", checkRole(["Admin"]), async (req, res) => {
  try {
    const deleteUser = await users.findOneAndDelete({ userId: req.params.id });
    if (!deleteUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).send("User Deleted Successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete all users
router.delete("/dlte/all", async (req, res) => {
  try {
    const result = await users.deleteMany({});
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No users to delete" });
    }
    res
      .status(200)
      .json({ message: `${result.deletedCount} users deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//handling invalid endpoints gracefully
router.use((req, res) => {
  res.status(404).send("Page not found");
});

export default router;
