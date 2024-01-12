const express = require("express");
const settingContollter = require("./../controller/settingController");
const router = express.Router();

router
  .route("/")
  .get(settingContollter.getSetting)
  .post(settingContollter.createSetting);
router.route("/:id").patch(settingContollter.updateSetting);
module.exports = router;
