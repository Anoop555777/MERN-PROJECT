const dotenv = require("dotenv");
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

app.listen(PORT, () => {
  console.log(`Application is running in port ${PORT}`);
});
