const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");
const util = require("util");

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

const sendToken = (res, user, statusCode) => {
  const token = generateToken(user);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

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

  sendToken(res, user, 201);
});

exports.login = catchAsync(async function (req, res, next) {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("please provide email and password", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError("wrong email or password", 401));

  sendToken(res, user, 200);
});

exports.protectRoute = catchAsync(async function (req, res, next) {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];

  if (!token) return next(new AppError("please log in again", 401));

  //verify of the token

  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );

  //check is the user still exists
  const freshUser = await User.findById(decoded.id).select("+role");

  if (!freshUser)
    return next(
      new AppError("Token belong to the user don't exist anymore", 401)
    );

  //if the user have change the password after login

  if (freshUser.changePasswordAfter(decoded.iat))
    return next(
      new AppError("user have change the password  please log in again", 401)
    );

  //next will grant excess to private reoutes
  req.user = freshUser;
  next();
});

exports.restrict =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      next(new AppError("You are forbidden", 403));
    next();
  };
