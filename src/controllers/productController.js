const productService = require("../services/productService");
const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  const allProducts = await productService.getAllProducts();
  res.send({ status: 200, data: allProducts });
};

const getSpecificProduct = async (req, res) => {
  const {
    params: { productID },
  } = req;
  if (!productID) {
    res.send({ status: 404, data: "no productID included" });
    return;
  }
  const product = productService.getSpecificProduct(productID);
  if (!product) {
    res.send({ status: 404, data: "product not found" });
  }
  res.send({ status: 200, data: product });
};

const createNewProduct = async (req, res) => {
  const { body } = req;
  const createdProduct = await productService.createNewProduct(body);
  if (!createdProduct) {
    res.send({ status: 404, data: "can't create new product" });
  }
  res.send({ status: 200, data: createdProduct });
};

const updateExistingProduct = (req, res) => {
  const {
    body,
    params: { productID },
  } = req;
  if (!productID) {
    res.send({ status: 404, data: "no productID included" });
    return;
  }
  const updatedProduct = productService.updateExistingProduct(productID, body);
  res.send("update existing product");
};

const deleteExistingProduct = (req, res) => {
  // productService.deleteExistingProduct();
  const {
    params: { productID },
  } = req;
  if (!productID) {
    res.send({ status: 404, data: "no productID included" });
    return;
  }
  res.send("delete existing product");
};

module.exports = {
  getAllProducts,
  getSpecificProduct,
  createNewProduct,
  updateExistingProduct,
  deleteExistingProduct,
};
