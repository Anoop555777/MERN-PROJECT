const mongoose = require("mongoose");
const Cabin = require("./../models/cabinModel");
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

reviewSchema.index({ cabin: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function () {
  this.populate({ path: "user", select: "name photo" });
});

reviewSchema.statics.calAvarageRating = async function (cabinId) {
  const static = await this.aggregate([
    {
      $match: {
        cabin: cabinId,
      },
    },
    {
      $group: {
        _id: "$cabin",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  await Cabin.findByIdAndUpdate(cabinId, {
    ratingQuantity: static[0].nRating || 0,
    ratingAverage: static[0].avgRating || 0,
  });
};

reviewSchema.post("save", function () {
  this.constructor.calAvarageRating(this.cabin);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calAvarageRating(this.r.cabin);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
