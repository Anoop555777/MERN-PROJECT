const AppError = require("../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/userModel");
const filterObj = function (obj, ...field) {
  const verifyField = {};
  Object.keys(obj).map((el) => {
    if (field.includes(el)) verifyField[el] = obj[el];
  });
  return verifyField;
};

exports.userMe = catchAsync(async (req, res, next) => {
  if (
    req.body.password ||
    req.body.confirmPassword ||
    Object.keys(req.body).length === 0
  )
    return next(new AppError("this is a wrong route", 400));

  const filterBody = filterObj(req.body, "name", "email");
  const updateUser = await User.findByIdAndUpdate(req.user._id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updateUser,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user._id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
