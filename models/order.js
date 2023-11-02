const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const OrderSchema = new mongoose.Schema({
    user: { type: ObjectId, ref: 'User' },
    products: [{ type: ObjectId, ref: 'Product' }],
    quantity: {
        requied: true,
        type: [Number],
    },
    orderDate: {
        requied: true,
        type: Date
    },
    status: String,
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('Order', OrderSchema)