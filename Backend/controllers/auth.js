const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require('jsonwebtoken')

// for sending otp
exports.sendOTP = async (req, res) => {
  try {
    // fetch email from req ki body
    const { email } = req.body;

    // check if user is present or not
    const isUserPresent = await User.findOne({ email });

    //if already registered with email send res that email is already exist
    if (isUserPresent) {
      res.status(400).json({
        success: false,
        message: "user is already exist in the database",
      });
    }

    // if not then generate otp

    let otp = otpGenerator(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("otp generated", otp);

    //check unique otp or not
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false, // find alternate lib for this do not use brut force
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };

    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);

    res.status(200).json({
      success: true,
      message: "Otp generated successfully",
      otp,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while generating otp",
      error: error.message,
    });
  }
};

// *****************// //**************************//
exports.signUp = async (req, res) => {
  try {
    // fetch details from user
    const {
      firstName,
      lastName,
      email,
      password,
      conformPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !conformPassword ||
      !contactNumber ||
      !otp
    ) {
      res.status(403).json({
        success: false,
        message: "please fill the mandatory details carefully",
      });
    }

    // check passwords are matched
    if (password !== conformPassword) {
      res.status(403).json({
        success: false,
        message: "Passwords are matched",
      });
    }

    // check user is already present or not
    const isUserPresent = await User.findOne({ email });
    if (isUserPresent) {
      res.status(400).json({
        success: false,
        message:
          "user email is already exist in the please try with another one",
      });
    }

    // check otp
    const recentOtp = await OTP.findOne({ email })
      .sort({ createAt: -1 })
      .limit(1);
    console.log(recentOtp);

    if (recentOtp.length == 0) {
      //OTP not found
      return res.status(400).json({
        success: false,
        message: "OTP not Found",
      });
    } else if (otp !== recentOtp.otp) {
      //Invalid OTP
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // hashed the password
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //entry create in DB

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    res.status(200).json({
      success: true,
      message: "sing up successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user not registered , server error",
      error: error.message,
    });
  }
};

// *****************// //**************************//

exports.login = async (req, res) => {
  try {
    //fetch data from user
    const { email, password } = req.body;
    // check all details are filled correctly

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "fill all the details correctly",
      });
    }

    // check is email registered or not

    const isUserPresent = await User.findOne({ email });

    if (!isUserPresent) {
      return res.status(403).json({
        success: false,
        message: "user is not registered , please sign up first",
      });
    }

    // fetch password from bcrypt decode using compare and match with fetched password

    const passwordMatched = await bcrypt.compare(
      password,
      isUserPresent.password
    );

    // if password matched then generate jwt token
    if (passwordMatched) {
      // create payload for jwt
      const payload = {
        email: isUserPresent.email,
        id: isUserPresent._id,
        accountType: isUserPresent.accountType,
      };

      let token =  jwt.sign(payload, process.env.SECRET, {
        expiresIn: "2h",
      });

      // add token to the user and hide password from user

      isUserPresent.token = token;
      isUserPresent.password = undefined;

      // create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user:isUserPresent,
        message: "Logged in successfully",
      });
    } else {
      res.status(403).json({
        success: false,
        message: "password is incorrect",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error while login",
      error: error,
      message,
    });
  }
};

//changePassword
//TODO: HOMEWORK
// exports.changePassword = async (req, res) => {
//get data from req body
//get oldPassword, newPassword, confirmNewPassowrd
//validation

//update pwd in DB
//send mail - Password updated
//return response
// }
