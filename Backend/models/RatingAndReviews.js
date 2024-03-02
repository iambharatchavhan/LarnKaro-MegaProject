const mongoose = require("mongoose");

const ratingsAndReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  rating: {
    type: Number, 
    required:true
  },

  review: {
    type: String,
    trim: true,
    required:true,
  },

});

module.exports = mongoose.model("RatingsAndReview",ratingsAndReviewSchema)
