const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review is required"],
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    cabin: {
      type: mongoose.Schema.ObjectId,
      ref: "Cabin",
      required: [true, "Review must belongs to a cabin"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belongs to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function () {
  this.populate({ path: "user", select: "name photo" });
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
