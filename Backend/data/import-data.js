const fs = require("fs");
const Cabin = require("./../models/cabinModel");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DataBase connected successfully"));

const cabins = JSON.parse(fs.readFileSync(`${__dirname}/cabin.json`, "utf-8"));

async function importData() {
  try {
    await Cabin.create(cabins);
    console.log("Data is placed in DB successfully");
  } catch (err) {
    console.log(err);
  }
  process.exit();
}

async function deleteData() {
  try {
    await Cabin.deleteMany();
    console.log(`data is deleted successfully from DB`);
  } catch (err) {
    console.log(err);
  }
  process.exit();
}

if (process.argv[2] === "--import") importData();
if (process.argv[2] === "--delete") deleteData();
