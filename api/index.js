// api/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes - adjust paths as needed
const userRoutes = require("../modules/users/users.routes");
const transactionsRoutes = require("../modules/transactions/transactions.routes");
const errorHandler = require("../handlers/errorHandlers");

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGODB_URI || process.env.mongo_connection, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to database", err));

// Load models
require("../models/users.model");
require("../models/transactions.model");

// Routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionsRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Handle 404
app.all("*", (req, res) => {
  res.status(404).json({ status: "Failed!", message: "Page Not Found!" });
});

// Error Handler
app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server started successfully!");
});
// Export the Express API
module.exports = app;
// module.exports = serverless(app);
