import express from "express";
import checkRole from "../middleware/authrole.js";
const router = express.Router();
// import jwt from "jsonwebtoken";

// const users = require("./userSchema");
import users from "../userSchema.js";

//add user
router.post(
  "/usercreation",
  checkRole(["Admin", "Member"]),
  async (req, res) => {
    const newUser = await users.create(req.body);
    res.status(200).json(newUser);
  }
);

//update user
router.put("/update/:id", checkRole(["Admin"]), async (req, res) => {
  const updateUser = await users.findOneAndUpdate(
    { userId: req.params.id },
    req.body,
    { new: true }
  );
  res.status(200).json(updateUser);
});

//get all users
router.get("/", checkRole(["Admin", "Member", "Guest"]), async (req, res) => {
  const allUsers = await users.find();
  res.status(200).json(allUsers);
});

//find by id
router.get(
  "/userid/:id",
  checkRole(["Admin", "Member", "Guest"]),
  async (req, res) => {
    const findById = await users.findOne({ userId: req.params.id });
    res.status(200).json(findById);
  }
);

//find by role
router.get(
  "/role/:role",
  checkRole(["Admin", "Member", "Guest"]),
  async (req, res) => {
    const findByRole = await users.find({ role: req.params.role });
    res.status(200).json(findByRole);
  }
);

//delete user
router.delete("/delete/:id", checkRole(["Admin"]), async (req, res) => {
  const deleteUser = await users.findOneAndDelete({ userId: req.params.id });
  res.status(200).send("User Deleted Successfully");
});

// // login endpoint
// router.post("/login", async (req, res) => {
//   try {
//     const { userId, password } = req.body;

//     // check if user exists
//     const found = await users.findOne({ userId: userId });
//     if (!found) {
//       return res.status(404).send("User not found");
//     }

//     // check password (⚠️ in real apps, use hashed passwords with bcrypt)
//     if (found.password !== password) {
//       return res.status(401).send("Invalid credentials");
//     }

//     // create JWT
//     const token = jwt.sign(
//       { userId: found.userId, role: found.role },
//       "secretkey", // 🔒 replace with env var
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({ message: "Login successful", token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

//handling invalid endpoints gracefully
router.use((req, res) => {
  res.status(404).send("Page not found");
});

export default router;
