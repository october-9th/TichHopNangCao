const Warranty = require('../models/warranty')
const ProductService = require('../services/productServices')
const UserService = require('../services/userServices')
const OrderService = require('../services/orderServices')

const getAllWarranty = async() => {
    const allWarranty = await Warranty.find()
    return allWarranty
}

const findWarranty = async(warrantyID) => {
    const warranty = await Warranty.findById(warrantyID)
    return warranty
}


const createNewWarranty = async(body) => {
    const { user, product, order, technician } = body

    const checkUser = await UserService.findUser(user)
    const checkTechnician = UserService.findTechnician(technician)
    if (!checkUser) {
        return { error: 'user not found' }
    }

    if (!checkTechnician) {
        return { error: 'technician not found' }
    }

    const checkProduct = await ProductService.findProduct(product)
    if (!checkProduct) {
        return { error: 'product not found' }
    }

    const checkOrder = await OrderService.findOrder(order)
    if (!checkOrder) {
        return { error: 'order not found' }
    }

    const newWarranty = new Warranty({
        order: order,
        product: product,
        user: user,
        issue: body.issue,
        status: body.status,
        technician: technician,
        resolution: body.resolution,
        dateResolved: body.dateResolved
    })

    try {
        const insertedWarranty = newWarranty.save()
        return insertedWarranty
    } catch (err) {
        return { error: err.message }
    }

}
const deleteWarranty = async(warrantyID) => {
    const deletedWarranty = Warranty.findAndDelete(warrantyID)
    return deleteWarranty
}

const updateWarranty = async(body, warrantyID) => {
    const updatedWarranty = Warranty.findAndUpdate(warrantyID, body, option = { new: true })
    return updateWarranty
}

module.exports = {
    getAllWarranty,
    findWarranty,
    createNewWarranty,
    updateWarranty,
    deleteWarranty
}