const mongoose = require("mongoose");
require("dotenv").config();

exports.connectToDatabase = async () => {

  try {
    mongoose.connect(process.env.DATABASE_URL, {});
    console.log("connected to the database successfully");

  } catch (error) {
    console.log("Error while connecting to the database");
    console.error(error);
    process.exit(1);

  }

};

