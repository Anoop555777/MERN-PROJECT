const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/appError");
const util = require("util");
const Email = require("./../utils/email");
const crypto = require("crypto");

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

const sendToken = (res, user, statusCode) => {
  const token = generateToken(user);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  res.locals.user = user;

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signIn = catchAsync(async function (req, res, next) {
  console.log(req.body);
  const obj = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    nationalId: req.body.nationalId,
  };

  if (req.body.nationality) obj.nationality = req.body.nationality;
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

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
};

exports.protectRoute = catchAsync(async function (req, res, next) {
  console.log(req.cookie);
  let token;
  if (req.cookies.jwt) token = req.cookies.jwt;
  else if (
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
  console.log(freshUser);
  next();
});

exports.restrict =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      next(new AppError("You are forbidden", 403));
    next();
  };

exports.forgetPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return next(
      new AppError("No email found!!! please enter valid email", 400)
    );

  //generate a ramdom token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword?reset_token=${resetToken}`;

  try {
    await new Email(user, resetUrl).sendPasswordReset();
    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    console.log(err);
    user.passwordResetToken = undefined;
    user.passwordExpireToken = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.query.reset_token)
    .digest("hex");
  const user = await User.findOne({
    passwordExpireToken: hashedToken,
    passwordExpireToken: { $gt: Date.now() },
  });

  if (!user) return next(new AppError("Token is invalid or expired", 400));

  const { password, confirmPassword } = req.body;
  if (!password || !confirmPassword)
    return next(new AppError("please enter all field required", 400));

  user.password = password;
  user.confirmPassword = confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordExpireToken = undefined;
  await user.save();

  sendToken(res, user, 200);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { passwordCurrent, password, confirmPassword } = req.body;
  if (!passwordCurrent || !password || !confirmPassword)
    return next(new AppError("All field are required", 400));

  const user = await User.findById(req.user._id).select("+password");

  if (!(await user.correctPassword(passwordCurrent, user.password)))
    return next(new AppError("enter correct password", 401));

  user.password = password;
  user.confirmPassword = confirmPassword;
  await user.save();
  const userUpdateInfo = await User.findById(user._id);
  sendToken(res, userUpdateInfo, 200);
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token

      const decoded = await util.promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET_KEY
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id).select("+role");

      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN U

      res.status(200).json({
        status: "success",
        user: {
          name: currentUser.name,
          email: currentUser.email,
          role: currentUser.role,
          nationalId: currentUser.nationalId,
          nationality: currentUser.nationality,
          photo: currentUser.photo,
          countryFlag: currentUser.countryFlag,
        },
      });
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.logout = (req, res, next) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10),
    httpOnly: true,
  });

  res.status(200).json({ status: "success", data: null });
};
