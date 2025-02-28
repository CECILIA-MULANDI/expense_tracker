const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwtManager = require("../../../managers/jwtManager");
const emailManager = require("../../../managers/emailManager");
const register = async (req, res, next) => {
  const usersModel = mongoose.model("users");
  const { full_name, email, password, confirm_password, balance } = req.body;
  if (!email) throw "Email must be provided";
  if (!password) throw "Password must be provided";
  if (!full_name) throw "Name is required";
  if (password.length < 5) throw "Password must be at least 5 characters long";
  if (password != confirm_password)
    throw "Password and confirm password must match";
  const getDuplicateEmail = await usersModel.findOne({
    email: email,
  });
  if (getDuplicateEmail) throw "This email already exists";
  const hashedPassword = await bcrypt.hash(password, 12);
  const createdUser = await usersModel.create({
    full_name: full_name,
    email: email,
    password: hashedPassword,
    balance: balance,
  });
  const accessToken = jwtManager(createdUser);
  await emailManager(
    createdUser.email,
    "Welcome to expense pro where you can track you expenses and income!",
    "< h1 > Welcome<h1/ >",
    "Welcome to expense pro!"
  );
  res.status(201).json({
    status: "User registered",
    accessToken: accessToken,
  });
};
module.exports = register;
