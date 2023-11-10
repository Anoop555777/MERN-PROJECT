const express = require("express");
const app = express();
const globalErrorHandler = require("./controller/errorController");
const cabinRouter = require("./routers/cabinRouter");
const userRouter = require("./routers/userRouter");

app.use(express.json());
app.use("/api/v1/cabins", cabinRouter);
app.use("/api/v1/users", userRouter);
app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `cannot find ${req.originalUrl} on the server`,
  });
});

app.use(globalErrorHandler);

module.exports = app;
