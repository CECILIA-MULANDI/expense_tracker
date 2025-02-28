const mongoose = require("mongoose");
const nodeMailer = require("nodemailer");
const emailManager = require("../../../managers/emailManager");
const forgotPassword = async (req, res) => {
  const usersModel = mongoose.model("users");
  const { email } = req.body;
  if (!email) throw "Email is required!";
  const getUser = await usersModel.findOne({
    email: email,
  });
  if (!getUser) throw "This user email does not exist in our system!";
  const resetCode = Math.floor(10000 + Math.random() * 90000);
  await usersModel.updateOne(
    {
      email: email,
    },
    {
      reset_code: resetCode,
    },
    {
      runValidators: true,
    }
  );
  await emailManager(
    email,
    "Your password reset code is " + resetCode,
    "Your password reset code is " + resetCode,
    "Reset your password!!"
  );

  res.status(200).json({
    status: "Reset email is sent succesfully!",
  });
};

module.exports = forgotPassword;
