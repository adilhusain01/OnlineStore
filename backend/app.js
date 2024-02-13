const express = require("express");
const app = express();
const router = require("./src/routes/productRoutes");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8000;

app.use(express.json());

mongoose

app.use('/api/products', router);

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
})