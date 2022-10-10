const mongoose = require('mongoose');

const furnitureSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    inventory: {
        required: true,
        type: Number,
        default: 0,
    },
    sku: {
        required: true,
        type: String,
    },
    unitPrice: {
        required: false,
        type: String,
    },
    modelMaterial: {
        required: true,
        type: String,
    },
    finished: {
        required: true,
        type: Boolean,
        default: false,
    },
    partOf: {
        required: false,
        type: mongoose.Types.ObjectId
    },
})

module.exports = mongoose.model('Furniture', furnitureSchema)