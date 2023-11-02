const express = require('express');

// import service handling data
const ProductService = require('../services/productServices')

const { accountantAuthenticate, adminAuthenticate, customerAuthenticate, warrantyAuthenticate } = require('../middleware/auth')

const router = express.Router()


// route for product 
router.get('/api/product', async(req, res) => {
    const allProduct = await ProductService.getAllProduct()
    if (allProduct instanceof Error) {
        res.status(404).json({ message: allProduct.error })
        return;
    }
    res.status(200).json({ products: allProduct })
})

router.get('/api/product/:ProductID', async(req, res) => {
    const { params: { ProductID } } = req
    const product = await ProductService.findProduct(productId)
    if (!product) {
        res.status(404).json({ error: "product not found" })
        return
    }
    res.status(200).json({ product: product })
})
router.post('/api/product', accountantAuthenticate, async(req, res) => {
    const { body } = req;
    if (!body.name || !body.description || !body.price || !body.manufacturer || !body.productCode) {
        res.json({ status: 400, error: 'please provide enough information' })
        return
    }
    const newProduct = await ProductService.createNewProduct(body)
    if (newProduct instanceof Error) {
        res.status(404).json({ message: newProduct.message })
        return
    } else if (!newProduct) {
        res.status(404).json({ message: "can't post the same product" })
        return
    }
    res.status(200).json({ newProduct: newProduct })
})

router.put('/api/product/:ProductID', accountantAuthenticate, async(req, res) => {
    const {
        body,
        params: { ProductID }
    } = req

    const updatedProduct = await ProductService.updateProduct(body, ProductID)
    if (!updatedProduct) {
        res.status(404).json({ error: "update product failed" })
        return
    }

    res.status(200).json({ message: "updated product success", updatedProduct: updatedProduct })
})

router.delete('/api/product/:ProductID', accountantAuthenticate, async(req, res) => {
    const { params: { ProductID } } = req
    const deletedProduct = await ProductService.deleteProduct(ProductID)
    if (!deletedProduct) {
        res.status(404).json({ error: "can't delete product" })
        return
    }
    res.status(200).json({ message: "delete product success", deletedProduct: deletedProduct })
})

module.exports = router