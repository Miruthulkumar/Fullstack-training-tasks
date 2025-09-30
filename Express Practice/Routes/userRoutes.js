import express from "express";
import checkRole from "../middleware/authrole.js";
const router = express.Router();
import jwt from "jsonwebtoken";

//importing ratelimiter
import generalLimiter from "../middleware/rateLimiter.js";

//env config for secket key
import env from "dotenv";
env.config();

// const users = require("./userSchema");
import users from "../userSchema.js";

//using ratelimiter middleware
router.use(generalLimiter);

// login endpoint
router.post("/login", async (req, res) => {
  try {
    const { userId, password } = req.body;

    // check if user exists
    const found = await users.findOne({ userId: userId });
    if (!found) {
      return res.status(404).send("User not found");
    }

    // check password replace with bcrypt
    if (found.password !== password) {
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
router.delete("/delete/:id", checkRole(["Admin"]), async (req, res) => {
  const deleteUser = await users.findOneAndDelete({ userId: req.params.id });
  res.status(200).send("User Deleted Successfully");
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
