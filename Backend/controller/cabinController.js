const Cabin = require("./../models/cabinModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.createCabin = catchAsync(async function (req, res, next) {
  const cabin = await Cabin.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      cabin,
    },
  });
});

exports.getAllCabins = catchAsync(async function (req, res, next) {
  const features = new APIFeatures(Cabin.find(), req.query)
    .filter()
    .sort()
    .field()
    .pagination();

  const cabins = await features.query;
  res.status(200).json({
    status: "success",
    result: cabins.length,
    data: {
      cabins,
    },
  });
});

exports.getCabin = catchAsync(async function (req, res, next) {
  const cabin = await Cabin.findById(req.params.id).populate("reviews");
  if (!cabin) return next(new AppError("No cabin found !!!", 404));
  res.status(200).json({
    status: "success",
    data: {
      cabin,
    },
  });
});

exports.updateCabin = catchAsync(async function (req, res, next) {
  const cabin = await Cabin.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      cabin,
    },
  });
});

exports.deleteCabin = catchAsync(async function (req, res, next) {
  const cabin = await Cabin.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    data: null,
  });
});

exports.stats = catchAsync(async function (req, res, next) {
  const stats = await Cabin.aggregate([
    {
      $match: { maxCapacity: { $gte: 5 } },
    },
    {
      $group: {
        _id: null,
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
        avgPrice: { $avg: "$price" },
        numOfCabin: { $sum: 1 },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: stats,
  });
});
