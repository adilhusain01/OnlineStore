const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    shipping: {
        type: Boolean,
        required: true,
        default: true
    },
    colors: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    images: [{
        id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    reviews: {
        type: Number,
        required: true,
        default: 0
    },
    stars: {
        type: Number,
        required: true,
        default: 0
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
