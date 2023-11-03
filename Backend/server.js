const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: `${path.resolve()}/config.env` });
const app = require("./app");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 8000;
const DB = process.env.DB.replace("<password>", process.env.DATABASE_PASSWORD);
console.log(DB);
app.listen(PORT, () => {
  console.log(`Application is running in port ${PORT}`);
});
