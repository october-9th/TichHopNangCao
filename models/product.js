const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    manufacturer: {
        required: true,
        type: String
    },
    productCode: {
        required: true,
        type: String
    },
    createdAt: Date,
    updatedAt: Date
});

module.exports = mongoose.model('Product', ProductSchema);