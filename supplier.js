const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    phoneNumber: {
        required: false,
        type: String,
    },
    materialsOrderNo: {
        required: true,
        type: String,
    },
    orderDate: {
        required: false,
        type: String,
    },
    deliveryDate: {
        required: true,
        type: Date,
    },
})

module.exports = mongoose.model('Supplier', supplierSchema)
