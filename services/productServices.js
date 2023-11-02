// import all required models 
const Product = require('../models/product');


const getAllProduct = async() => {
    try {
        const products = await Product.find()
        return products
    } catch (error) {
        return error
    }
}

const createNewProduct = async(body) => {
    const checkProduct = await Product.findOne({ "name": body.name })
    if (checkProduct) {
        return null 
    }
    const product = new Product({
        name: body.name,
        description: body.description,
        price: body.price,
        manufacturer: body.manufacturer,
        productCode: body.productCode,
        createdAt: new Date().toLocaleString("vn-VN", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString("vn-VN", { timeZone: "UTC" }),
    })

    try {
        const insertProduct = await product.save()
        return insertProduct
    } catch (error) {
        return error
    }
}

const findProduct = async(productId) => {
    const checkProduct = await Product.findById(productId)
    if (!checkProduct) {
        return null
    }
    return checkProduct
}

const updateProduct = async(changes, productID) => {
    const result = await Product.findByIdAndUpdate(
        productID,
        changes,
        option = { new: true }
    )
    if (!result) {
        return null
    }
    return result
}

const deleteProduct = async(productID) => {
    const deletedProduct = await Product.findByIdAndDelete(productID)
    if (!deletedProduct) {
        return null
    }
    return deletedProduct
}
module.exports = {
    getAllProduct,
    createNewProduct,
    findProduct,
    updateProduct,
    deleteProduct
}