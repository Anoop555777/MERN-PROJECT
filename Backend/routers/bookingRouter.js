const express = require("express");
const authController = require("./../controller/authController");
const bookingController = require("./../controller/bookingController");
const router = express.Router({ mergeParams: true });
router
  .route("/")
  .post(
    // authController.protectRoute,
    // authController.restrict("user"),
    bookingController.createBooking
  )
  .get(
    // authController.protectRoute,
    // authController.restrict("user"),
    bookingController.getAllBookings
  );

router
  .route("/:bookingId")
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
