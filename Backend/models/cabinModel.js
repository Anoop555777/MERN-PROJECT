const mongoose = require("mongoose");

const cabinSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "Name is required"],
  },
  maxCapacity: {
    type: Number,
    required: [true, "Capacity is required"],
    min: [1, "capacity must be more than one"],
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
    min: [0, "rating must be more than 1"],
    max: [5, "rating must not be greater than 5"],
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "Cabin must have a price"],
  },
  priceDiscount: {
    type: Number,
  },
  description: {
    type: String,
    trim: true,
  },
  images: [String],
  imageCover: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  slug: String,
  imageCover: String,
});

const Cabin = mongoose.model("Cabin", cabinSchema);
module.exports = Cabin;
