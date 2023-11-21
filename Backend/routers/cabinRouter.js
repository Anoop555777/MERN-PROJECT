const express = require("express");
const router = express.Router();
const cabinController = require("./../controller/cabinController");
const authController = require("./../controller/authController");
const reviewRouter = require("./../routers/reviewRouter");

router.use("/:cabinId/reviews", reviewRouter);

router
  .route("/")
  .get(cabinController.getAllCabins)
  .post(cabinController.createCabin);

router.route("/stats").get(cabinController.stats);

router
  .route("/:id")
  .get(cabinController.getCabin)
  .delete(
    authController.protectRoute,
    authController.restrict("admin", "employee"),
    cabinController.deleteCabin
  )
  .patch(cabinController.updateCabin);

module.exports = router;
