const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Setting = require("./../models/settingModel");
exports.getSetting = catchAsync(async function (req, res, next) {
  const setting = await Setting.find();
  if (!setting) return next(new AppError("No Setting found !!!", 404));
  res.status(200).json({
    status: "success",
    data: {
      setting,
    },
  });
});

exports.createSetting = catchAsync(async function (req, res, next) {
  const setting = await Setting.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      setting,
    },
  });
});

exports.updateSetting = catchAsync(async function (req, res, next) {
  const setting = await Setting.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    status: "success",
    data: {
      setting,
    },
  });
});
