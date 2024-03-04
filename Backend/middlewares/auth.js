const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    // get token from header
    const token = req.headers("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Token is not present",
      });
    }
    // now decode token

    try {
      const decode = jwt.verify(token, process.env.SECRET);

      // save it to the user
      req.user = decode;
    } catch (error) {
      return res.status(403).json({
        success: false,
        message: "token is not valid",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while validating jwt token",
      error: error.message,
    });
  }
};

// protecting routes for students

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.accountType == "Student") {
      return res.status(403).json({
        success: false,
        message: "Your not Authorized to this route, Protected route:Students",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};


exports.isAdmin = (req, res, next) => {
    try {
      if (req.user.accountType == "Admin") {
        return res.status(403).json({
          success: false,
          message: "Your not Authorized to this route, Protected route:Students",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "User role cannot be verified, please try again",
      });
    }
  };


  exports.isInstructor = (req, res, next) => {
    try {
      if (req.user.accountType == "Instructor") {
        return res.status(403).json({
          success: false,
          message: "Your not Authorized to this route, Protected route:Students",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "User role cannot be verified, please try again",
      });
    }
  };