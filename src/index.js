require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const v1RouterProduct = require("./v1/routes/productRoutes");
const port = process.env.PORT;
const connectDB = require("./config/db");

app.use(bodyParser.json());
await connectDB();
app.use("/api/v1/products", v1RouterProduct);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
