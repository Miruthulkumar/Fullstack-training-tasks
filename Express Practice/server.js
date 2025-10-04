// const express = require("express");
import express from "express"; //can be used after adding the type:"module" in package.json [Thanks Sanjai!]
import logTimestamp from "./middleware/logTimestamp.js";
import generalLimiter from "./middleware/rateLimiter.js";
import responseTime from "response-time";
import helmet from "helmet";
const app = express();

//import env from dotenv
import env from "dotenv";
env.config();

// const connectDb = require("./db");
import connectDb from "./db.js";
connectDb();

//middleware to use json
app.use(express.json());

app.use(helmet());

//calling timestamp middleware
app.use(logTimestamp);

//calling ratelimiter middleware
app.use(generalLimiter);

//calling responsetimelogger middleware
app.use(responseTime());

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Management API",
      version: "1.0.0",
      description: "API documentation for User Management project",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./Routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//importing home router
import homeRoutes from "./Routes/homeRoutes.js";
app.use("/home", homeRoutes);

// importing user router
import userRoutes from "./Routes/userRoutes.js";
app.use("/users", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`The server is running at port ${process.env.PORT} ✅`);
});
