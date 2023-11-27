const catchAsync = require("./../utils/catchAsync");
const Booking = require("./../models/bookingModel");
exports.createBooking = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user._id;
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

exports.getMyBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.find({ user: req.user._id });

  if (!booking)
    return next(new AppError("sorry no Booking for this user", 404));

  res.status(200).json({
    status: "success",
    result: booking.length,
    data: {
      booking,
    },
  });
});

exports.getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find();
  if (!booking) return next(new AppError("Booking not found", 404));

  res.status(200).json({
    status: "success",
    result: bookings.length,
    data: {
      bookings,
    },
  });
});
