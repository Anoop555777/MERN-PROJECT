const catchAsync = require("./../utils/catchAsync");
const Booking = require("./../models/bookingModel");
const APIFeatures = require("../utils/apiFeatures");
exports.createBooking = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
  console.log(req.body);
  const booking = await Booking.create(req.body);
  if (!booking)
    return next(
      new AppError("can't able to create a booking please try again.", 404)
    );

  res.status(201).json({
    status: "success",
    data: {
      booking,
    },
  });
});

exports.getAllBookings = catchAsync(async (req, res, next) => {
  const filter = {};
  if (req.params.userId) filter.user = req.params.userId;
  const features = new APIFeatures(Booking.find(filter), req.query)
    .filter()
    .sort()
    .field()
    .pagination();

  const bookings = await features.query;

  const filterBookingSize = await features.query.explain();
  const totalBookings = await Booking.countDocuments();
  const {
    executionStats: {
      executionStages: {
        inputStage: {
          inputStage: { nReturned: noOfFilterBookings },
        },
      },
    },
  } = filterBookingSize[0];

  if (!bookings) return next(new AppError("Booking not found", 404));

  res.status(200).json({
    status: "success",
    result: bookings.length,
    data: {
      bookings,
      noOfFilterBookings,
      totalBookings,
    },
  });
});

exports.getBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.bookingId);
  if (!booking) return next(new AppError("No booking found", 404));
  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
});

exports.updateBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.bookingId,
    req.body
  );
  if (!booking) return next(new AppError("No booking found", 404));
  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
});

exports.deleteBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndDelete(req.params.bookingId);
  if (!booking) return next(new AppError("No booking found", 404));
  res.status(204).json({
    status: "success",
    data: null,
  });
});
