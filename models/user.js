const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'technician', 'accountant', 'customer']
    },
    password: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    createdAt: Date,
    updatedAt: Date
})

module.exports = mongoose.model('User', userSchema)