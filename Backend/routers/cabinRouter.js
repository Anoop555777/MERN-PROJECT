const express = require("express");
const router = express.Router();
const cabinController = require("./../controller/cabinController");
router.route("/").post(cabinController.createCabin);
module.exports = router;
