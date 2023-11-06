const express = require("express");
const router = express.Router();
const cabinController = require("./../controller/cabinController");
router
  .route("/")
  .get(cabinController.getAllCabins)
  .post(cabinController.createCabin);

router
  .route("/:id")
  .delete(cabinController.deleteCabin)
  .patch(cabinController.updateCabin);
module.exports = router;
