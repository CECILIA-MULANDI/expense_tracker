const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const jwtManager = require("../../../managers/jwtManager");
const login = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { email, password } = req.body;
  const getUser = await usersModel.findOne({
    email: email,
  });
  if (!getUser) throw "This email does not exist in our system!";
  const comparePassword = await bcrypt.compare(password, getUser.password);
  if (!comparePassword) throw "Invalid password";
  console.log(getUser);

  const accessToken = jwtManager(getUser);
  res.status(200).json({
    status: "Success!",
    message: "User logged in",
    accessToken: accessToken,
  });
};
module.exports = login;
