const AppError = require("../utils/appError");

function sendErrorDev(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
}

function sendErrorProd(err, res) {
  //operational trusted error please provide full infomation to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // programmable err or other error don't leak to client
    console.log("ERROR💥", err);
    res.status(500).json({
      status: "err",
      message: "something went wrong please try again later",
    });
  }
}

function handleCastError(err) {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
}

function handleDuplicateError(err) {
  let { name } = err.keyValue;
  let message;
  if (name) {
    message = `Duplicate Field value ${name.toUpperCase()} please enter another value`;
  } else {
    message = `Duplicate one user can give only one review for particular cabin `;
  }
  return new AppError(message, 400);
}

function handleValidationError(err) {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `invalid input data ${errors.join(", ")}`;
  return new AppError(message, 400);
}

const handleJWTError = () =>
  new AppError("Invalid token! please log in again", 401);

const handleTokenExpiredError = () =>
  new AppError("token has expired please login again", 401);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.statusCode || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    if (err.name === "CastError") error = handleCastError(error);
    if (err.code === 11000) error = handleDuplicateError(error);
    if (err.name === "ValidationError") error = handleValidationError(error);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError")
      error = handleTokenExpiredError(error);

    sendErrorProd(error, res);
  }
};
