const Product = require("../models/productModel");
const User = require("../models/userModel");

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: `No product with ID ${req.params.id}` });
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = new Product({
            stock: req.body.stock,
            price: req.body.price,
            shipping: req.body.shipping,
            colors: req.body.colors,
            category: req.body.category,
            images: req.body.images,
            reviews: req.body.reviews,
            stars: req.body.stars,
            name: req.body.name,
            description: req.body.description,
            company: req.body.company
        });
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) res.status(404).json({ message: `No product with ID ${req.params.id}` });
        else res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) res.status(404).json({ message: `No product with ID ${req.params.id}` });
        else res.status(200).json({ message: `Product with ID ${req.params.id} deleted successfully` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
