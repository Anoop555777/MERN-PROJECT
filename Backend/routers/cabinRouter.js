const express = require("express");
const router = express.Router();
const cabinController = require("./../controller/cabinController");
router
  .route("/")
  .get(cabinController.getAllCabins)
  .post(cabinController.createCabin);

router.route("/stats").get(cabinController.stats);

router
  .route("/:id")
  .get(cabinController.getCabin)
  .delete(cabinController.deleteCabin)
  .patch(cabinController.updateCabin);
module.exports = router;
