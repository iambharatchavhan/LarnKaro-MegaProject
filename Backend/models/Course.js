const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    trim: true,
    required: true,
  },

  courseDescription: {
    type: String,
    trim: true,
    required: true,
  },
  whatWillYouLearn: {
    type: String,
    trim: true,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
  },

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  courseContent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],

  ratingsAndReview: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RatingsAndReview",
    },
  ],

  tag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag",
  },

  studentEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Course", courseSchema);
