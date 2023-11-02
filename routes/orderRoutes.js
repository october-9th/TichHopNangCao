const express = require('express');

// import service handling data
const OrderService = require('../services/orderServices')

const { accountantAuthenticate, customerAuthenticate } = require('../middleware/auth')

const router = express.Router()


// route for order 
router.get('/api/order', accountantAuthenticate, async(req, res) => {
    const allOrder = await OrderService.getAllOrder()
    if (!allOrder) {
        res.status(404).json({ error: 'cant get all warranty' })
        return
    }
    res.status(200).json({ allOrder: allOrder })
})
router.get('/api/order/:orderID', customerAuthenticate, async(req, res) => {
    const { params: { orderID } } = req
    const order = await OrderService.findOrder(orderID)
    if (!order) {
        res.status(404).json({ error: 'order not found' })
        return
    }
    res.status(200).json({ order: order })
})
router.post('/api/order', accountantAuthenticate, async(req, res) => {
    const { body } = req
    const newOrder = await OrderService.createNewOrder(body)
    if (!newOrder) {
        res.status(404).json(newOrder)
        return
    }
    res.status(200).json({ newOrder: newOrder })
})

router.put('/api/order/:orderID', accountantAuthenticate, async(req, res) => {
    const { body, params: { orderID } } = req
    const updatedOrder = OrderService.updateOrder(body, orderID)
    if (!updatedOrder) {
        res.status(404).json({ error: 'order not found' })
        return
    }
    res.status(200).json({ updatedOrder: updatedOrder })
})

router.delete('/api/order/:orderID', accountantAuthenticate, async(req, res) => {
    const { params: { orderID } } = req
    const deletedOrder = OrderService.deleteOrder(orderID)
    if (!deletedOrder) {
        res.status(404).json({ error: 'Order not found' })
        return
    }
    res.status(200).json({ deletedOrder: deletedOrder })
})

module.exports = router