const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
exports.signIn = catchAsync(async function (req, res, next) {
  const obj = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    nationalId: req.body.nationalId,
    nationality: req.body.nationality,
  };

  const user = await User.create(obj);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });

  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});
