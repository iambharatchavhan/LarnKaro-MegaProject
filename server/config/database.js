const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = async () => {

  try {
    mongoose.connect(process.env.MONGODB_URL, {});
    console.log("connected to the database successfully");

  } catch (error) {
    console.log("Error while connecting to the database");
    console.error(error);
    process.exit(1);

  }

};

