const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "Email is not found, Please Enter correct email or signup",
      });
    }

    // if user find generate unique link
    const token = crypto.randomUUID();

    // now update user using token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
      { new: true }
    );

    //create url from token

    const url = `http://localhost:3000/update-password/${token}`;

    // send this url on mail

    await mailSender(
      email,
      "Reset Your Password-LearnKaro",
      `password reset link = ${url}`
    );

    //return response
    return res.status(200).json({
      success: true,
      message:
        "Email sent successfully, please check email and change password",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending reset pwd mail",
    });
  }
};

// mail to send ho gaya but ab password reset karo

exports.resetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "please fill the mandatory details",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm are Password not matching",
      });
    }

    // get userDetails from the user but how using token
    const userDetails = await User.findOne({ token: token });

    // check this is the valid entry of the user
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token - while resetting password",
      });
    }

    // check token time
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.json({
        success: false,
        message: "Token is expired, please regenerate your token",
      });
    }

    // if token is valid then create new password hash it before saving to the database

    const hashedPassword = await bcrypt.hash(password, 10);

    // update database by finding token

    const updatedDatabase = await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong while reset password",
      error: error.message,
    });
  }
};
