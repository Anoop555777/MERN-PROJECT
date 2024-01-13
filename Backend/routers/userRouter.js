const express = require("express");
const authController = require("../controller/authController");
const userController = require("../controller/userController");
const bookingRouter = require("./../routers/bookingRouter");
const router = express.Router();
router.use("/:userId/myBookings", bookingRouter);

router.post("/signup", authController.signIn);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.route("/isLoggedin").get(authController.isLoggedIn);
router.post("/forgetPassword", authController.forgetPassword);
router.post("/resetPassword", authController.resetPassword);
router.patch(
  "/updatePassword",
  authController.protectRoute,
  authController.updatePassword
);

router.patch(
  "/userMe",
  authController.protectRoute,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.userMe
);

router.delete(
  "/deleteMe",
  authController.protectRoute,
  userController.deleteUser
);
module.exports = router;
