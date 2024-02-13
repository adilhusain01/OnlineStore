const products = require("/home/adil/Desktop/OnlineStore/backend/public/products.json");

const getProducts = (req, res) => {
    res.status(200).json(products);
}

module.exports = { getProducts };