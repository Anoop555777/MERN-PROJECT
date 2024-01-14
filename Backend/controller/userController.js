const AppError = require("../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/userModel");
const multer = require("multer");
const sharp = require("sharp");
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "Frontend/vite-project/public/img");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new AppError("not a image! please upload a image", 400), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500, {
      fit: sharp.fit.cover,
    })
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`Frontend/public/data/img/users/${req.file.filename}`);
  next();
});

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
  if (req.file) filterBody.photo = `${req.file.filename}`;
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
