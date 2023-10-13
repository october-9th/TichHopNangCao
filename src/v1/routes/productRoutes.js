const express = require("express");
const router = express.Router();

const productController = require("../../controllers/productController");

// route for product controller
// get all products
router.get("/", productController.getAllProducts);

// get product by id
router.get("/:productID", productController.getSpecificProduct);

// create new product
router.post("/", productController.createNewProduct);

// update product by id
router.patch("/:productID", productController.updateExistingProduct);

// delete product by id
router.delete("/:productID", productController.deleteExistingProduct);

module.exports = router;
