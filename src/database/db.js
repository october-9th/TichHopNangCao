require("dotenv").config({ path: "../../.env" });
const mongoose = require("mongoose");

const connectDB = () => {
  const db_url = process.env.DATABASE_URL;
  mongoose.connect(db_url);

  const database = mongoose.connection;

  database.on("error", (error) => {
    console.log(error);
  });

  database.once("connected", () => {
    console.log("Database Connected");
  });
};

module.exports = connectDB;
