const express = require("express");
const router = express.Router();
const authController = require("./../controller/authController");
const bookingController = require("./../controller/bookingController");
router
  .route("/")
  .post(authController.protectRoute, bookingController.createBooking)
  .get(
    authController.protectRoute,
    authController.restrict("admin"),
    bookingController.getAllBookings
  );

module.exports = router;
