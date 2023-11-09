const dotenv = require("dotenv");
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION shuttingdown...💥");
  console.log(err.name, err.message);
  process.exit(1);
});

const path = require("path");
dotenv.config({ path: `${path.resolve()}/config.env` });
const app = require("./app");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8000;

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect to Database successfully"))
  .catch((err) => console.log(`connection failed ${err}`));

const server = app.listen(PORT, () => {
  console.log(`Application is running in port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION shuttingdown...💥");
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
