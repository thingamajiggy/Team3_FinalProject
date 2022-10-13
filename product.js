const mongoose = require('mongoose');

const productComponent = new mongoose.Schema({
    componentId: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: 'Components'
    },
    component: {
        required: true,
        type: String,
  },
    quantity: {
        required: true,
        type: Number,
    }
})

const productSchema = new mongoose.Schema({
    productName: {
        required: true,
        type: String
    },
    components: {
        required: true,
        type: [productComponent]
    }
})

module.exports = mongoose.model('Product', productSchema)
