const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const WarrantySchema = new mongoose.Schema({
    order: { type: ObjectId, ref: 'Order' },
    product: { type: ObjectId, ref: 'Product' },
    user: { type: ObjectId, ref: 'User' },
    issue: {
        required: true,
        type: String
    },
    status: String,
    technician: { type: ObjectId, ref: 'User' },
    resolution: String,
    dateResolved: Date
});

module.exports = mongoose.model('Warranty', WarrantySchema)