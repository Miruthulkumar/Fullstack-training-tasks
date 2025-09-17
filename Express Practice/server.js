// const express = require("express");
import express from "express"; //can be used after adding the type:"module" in package.json [Thanks Sanjai!]
const app = express();
const PORT = 6000;
app.use(express.json());

app.get("/home", (req, res) => {
  res.status(200).send("Hello, World!");
});

app.get("/home/user/:name", (req, res) => {
  const userName = req.params.name;
  res.status(200).send(`Hello, ${userName}`);
});

app.post("/home/post", (req, res) => {
  const userData = req.body;
  res.status(200).json(userData);
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`The server is running at port ${PORT} 🏃‍♂️`);
});
