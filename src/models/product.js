const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  image: {
    required: true,
    type: String,
  },
  created_at: {
    required: false,
    type: String,
  },
  updated_at: {
    required: false,
    type: String,
  },
});

module.exports = mongoose.model("Product", productSchema);
