const express = require("express");
const reviewController = require("./../controller/reviewController");
const authController = require("./../controller/authController");
const router = express.Router({ mergeParams: true });
router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    authController.protectRoute,
    authController.restrict("user"),
    reviewController.createReview
  );

router
  .route("/:id")
  .patch(
    authController.protectRoute,
    authController.restrict("user"),
    reviewController.updateReview
  )
  .delete(
    authController.protectRoute,
    authController.restrict("user"),
    reviewController.deleteReview
  );

module.exports = router;
