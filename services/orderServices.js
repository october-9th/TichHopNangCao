const Order = require('../models/order')
const ProductService = require('../services/productServices')
const UserService = require('../services/userServices')

const getAllOrder = async() => {
    const allOrders = await Order.find()
    return allOrders
}
const findOrder = async(orderID) => {
    const order = await Order.findById(orderID)
    return order
}
const validateProducts = async(products) => {

    for (let product of products) {

        const exists = await ProductService.findProduct(product);

        if (!exists) {
            return false
        }

    }

}

const createNewOrder = async(body) => {
    const { user, products } = body
    const checkUser = await UserService.findUser(user)
    if (!checkUser) {
        return { error: 'user not found' }
    }
    const checkProduct = await validateProducts(products)
    if (!checkProduct) {
        return { error: 'one of the product is not exist' }
    }

    const newOrder = new Order({
        user: user,
        products: products,
        quantity: body.quantity,
        orderDate: body.orderDate,
        status: body.status,
        createdAt: new Date().toLocaleString("vn-VN", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString("vn-VN", { timeZone: "UTC" }),
    })

    try {
        const insertedOrder = await newOrder.save()
        return insertedOrder
    } catch (err) {
        return { err: err.message }
    }
}

const deleteOrder = async(orderId) => {
    const deletedOrder = Order.findAndDelete(orderId)
    return deletedOrder
}

const updateOrder = async(body, orderId) => {
    const updatedOrder = Order.findAndUpdate(orderId, body, option = { new: true })
    return updatedOrder
}


module.exports = {
    getAllOrder,
    findOrder,
    updateOrder,
    deleteOrder,
    createNewOrder
}