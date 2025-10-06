import express from 'express'
const router=express.Router();

//returns hello world
router.get("/", (req, res) => {
  res.status(200).send("Hello, World!");
});

//returns Hello (username)
router.get("/user/:name", (req, res) => {
  const userName = req.params.name;
  res.status(200).send(`Hello, ${userName}`);
});

//returns payload json back to user
router.post("/post", (req, res) => {
  const userData = req.body;
  res.status(200).json(userData);
});

// exporting home router
export default router