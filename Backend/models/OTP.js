const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

// sending mail we are using pre middleware that send mail before creating entry to the database

async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification mail fom LearnKaro",
      otp
    );
    console.log("the email response", mailResponse);
  } catch (error) {
    console.log("Error while sending mail", error.message);
  }
}



otpSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});


module.exports = mongoose.model("OTP", otpSchema);
