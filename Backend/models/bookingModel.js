const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  startDate: {
    type: Date,
    required: [true, "booking must have a starting date"],
  },
  endDate: {
    type: Date,
    required: [true, "booking must have a ending date"],
  },
  numNights: {
    type: Number,
    min: 1,
    reqired: [true, "no of nights required"],
  },
  numGuests: {
    type: Number,
    min: 1,
    required: [true, "no of guest groups required"],
  },
  cabinPrice: { type: Number, required: [true, "Booking must have a price."] },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  extraPrice: {
    type: Number,
  },
  totalPrice: { type: Number },
  status: {
    type: String,
    required: [true, "booking must have a status"],
  },
  hasBreakFast: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Booking must belong to a User!"],
  },
  cabin: {
    type: mongoose.Schema.ObjectId,
    ref: "Cabin",
    required: [true, "Booking must belong to a Cabin!"],
  },
  status: {
    type: String,
    required: [true, "Status must to belong to a Cabin"],
    enum: {
      values: ["checked-in", "checked-out", "unconfirmed"],
      message: "only these field is required",
    },
    default: "unconfirmed",
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate({ path: "cabin" }).populate({
    path: "user",
    select: "name email nationalId nationality countryFlag",
  });
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
