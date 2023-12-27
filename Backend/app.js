const express = require("express");
const app = express();
const globalErrorHandler = require("./controller/errorController");
const cabinRouter = require("./routers/cabinRouter");
const userRouter = require("./routers/userRouter");
const bookingRouter = require("./routers/bookingRouter");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSantization = require("express-mongo-sanitize");
const xssClean = require("xss-clean");
const hpp = require("hpp");
const reviewRouter = require("./routers/reviewRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(helmet());
app.use(
  express.json({
    limit: "10kb",
  })
);
app.use(cookieParser());
app.use(cors());
const limit = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "To many request from the same IP please try again in an hour.",
});
app.use("/api", limit);
app.use(mongoSantization());
app.use(xssClean());
app.use(hpp());

////////////////////////////////////////////
//Routes
/////////////////////////////////
app.use("/api/v1/cabins", cabinRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `cannot find ${req.originalUrl} on the server`,
  });
});

app.use(globalErrorHandler);

module.exports = app;
