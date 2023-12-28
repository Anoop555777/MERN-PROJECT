const Cabin = require("./../models/cabinModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const multer = require("multer");
const sharp = require("sharp");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new AppError("not a image! please upload a image", 400), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadCabinPhoto = upload.fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 3 },
]);

exports.resizeCabinPhoto = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();

  const imageCover = `data/img/cabin/cover-image-${Date.now()}.jpeg`;

  req.body.imageCover = imageCover;

  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333, {
      fit: sharp.fit.cover,
    })
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`Frontend/public/${imageCover}`);

  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `Frontend/public/data/img/cabin/cabin-${
        Date.now() + i + 1
      }.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333, {
          fit: sharp.fit.cover,
        })
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(filename);

      req.body.images.push(filename);
    })
  );

  next();
});

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
