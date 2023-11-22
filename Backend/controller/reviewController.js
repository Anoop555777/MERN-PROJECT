const Review = require("./../models/reviewModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
exports.getAllReviews = catchAsync(async (req, res, next) => {
  const filter = {};
  if (req.params.cabinId) filter.cabin = req.params.cabinId;
  const reviews = await Review.find(filter);

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.cabin) req.body.cabin = req.params.cabinId;
  if (!req.body.user) req.body.user = req.user._id;
  const review = await Review.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!review) return next(new AppError(404, "NO review found of this Id"));

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) return next(new AppError(404, "NO review found of this Id"));
  res.status(204).json({
    status: "success",
    data: null,
  });
});
