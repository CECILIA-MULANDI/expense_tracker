require("express-async-errors");
require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const userRoutes = require("./modules/users/users.routes");
const transactionsRoutes = require("./modules/transactions/transactions.routes");
const errorHandler = require("./handlers/errorHandlers");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.mongo_connection, {})
  .then(() => console.log("Successfully connected to MongoDB!"))
  .catch(() => console.log("Failed to connect to database"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionsRoutes);

// Models

require("./models/users.model");
require("./models/transactions.model");

// Handle 404
app.all("*", (req, res) => {
  res.status(404).json({ status: "Failed!", message: "Page Not Found!" });
});

// Error Handler
app.use(errorHandler);

// Export as a serverless function
module.exports = app;
module.exports.handler = serverless(app);
