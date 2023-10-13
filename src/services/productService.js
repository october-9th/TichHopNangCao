const Product = require("../models/product");

const getAllProducts = () => {
  try {
    const allProducts = Product.find();
    return allProducts;
  } catch (error) {
    return null;
  }
};

const getSpecificProduct = (productID) => {
  const productFind = Product.findById(productID);
  return productFind;
};

const createNewProduct = async (body) => {
  const productInsert = new Product({
    name: body.name,
    description: body.description,
    image: body.image,
    price: body.price,
    created_at: new Date().toLocaleString("vi-VN", { timeZone: "UTC" }),
    updated_at: new Date().toLocaleString("vi-VN", { timeZone: "UTC" }),
  });
  try {
    const productSave = await productInsert.save();
    return productSave;
  } catch (error) {
    return null;
  }
};

const updateExistingProduct = () => {
  return;
};

const deleteExistingProduct = () => {
  return;
};

module.exports = {
  getAllProducts,
  getSpecificProduct,
  createNewProduct,
  updateExistingProduct,
  deleteExistingProduct,
};
