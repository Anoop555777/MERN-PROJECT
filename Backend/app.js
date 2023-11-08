const express = require("express");
const app = express();
const globalErrorHandler = require("./controller/errorController");
const cabinRouter = require("./routers/cabinRouter");

app.use(express.json());
app.use("/api/v1/cabins", cabinRouter);
app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `cannot find ${req.originalUrl} on the server`,
  });
});

app.use(globalErrorHandler);

module.exports = app;
