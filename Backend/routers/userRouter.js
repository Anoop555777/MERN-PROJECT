const express = require("express");
const authController = require("../controller/authController");
const router = express.Router();

router.post("/signin", authController.signIn);
router.post("/login", authController.login);
router.post("/forgetPassword", authController.forgetPassword);
router.post("/resetPassword", authController.resetPassword);
module.exports = router;
