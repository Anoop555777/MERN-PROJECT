const express = require("express");
const app = express();
const cabinRouter = require("./routers/cabinRouter");

app.use(express.json());
app.use("/api/v1/cabins", cabinRouter);
module.exports = app;
