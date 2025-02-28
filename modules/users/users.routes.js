const express = require("express");
const register = require("./controllers/register");
const login = require("./controllers/login");
const userDashboard = require("./controllers/userDashboard");
const forgotPassword = require("./controllers/forgotPassword");
const auth = require("../../middleware/auth");
const resetPassword = require("./controllers/resetPassword");

const userRoutes = express.Router();

//Routes
userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/forgotpwd", forgotPassword);
userRoutes.post("/resetpwd", resetPassword);
userRoutes.use(auth);

// Protected routes
userRoutes.get("/dashboard", userDashboard);
module.exports = userRoutes;
