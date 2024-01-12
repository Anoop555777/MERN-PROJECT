const mongoose = require("mongoose");

const settingSchema = mongoose.Schema({
  minBookingLength: {
    type: Number,
    required: [true, "field is required"],
  },
  maxBookingLength: {
    type: Number,
    required: [true, "field is required"],
  },
  maxGuestPerBooking: {
    type: Number,
    required: [true, "field is required"],
  },
  breakfastPrice: {
    type: Number,
    required: [true, "field is required"],
  },
});

const Setting = mongoose.model("Setting", settingSchema);
module.exports = Setting;
