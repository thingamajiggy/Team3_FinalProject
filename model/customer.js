const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    phoneNumber: {
        required: false,
        type: String,
    },
    orderDate: {
        required: false,
        type: Date,
    },
    furnitureOrder: {
        required: true,
        type: [mongoose.Types.ObjectId],
    }
})

module.exports = mongoose.model('Customer', customerSchema)
