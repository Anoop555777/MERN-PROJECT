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
const path = require("path");
const settingRouter = require("./routers/settingRouter");

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "to many request from this IP, please try again in an hour",
});

app.use("/api", limiter);

app.use(
  express.json({
    limit: "10kb",
  })
);
app.use(cookieParser());

app.use(cors());
app.options("*", cors());

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
app.use("/api/v1/settings", settingRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "/Frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(path.resolve(), "Frontend", "dist", "index.html"))
  );
}

app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `cannot find ${req.originalUrl} on the server`,
  });
});

app.use(globalErrorHandler);

module.exports = app;
