const express = require("express");
require("express-async-errors"); 
const app = express();
const productRouter = require("./src/routes/productRoutes");
const userRouter = require("./src/routes/userRoutes");
const errorHandleMiddleWare = require("./src/middlewares/errorHandlers");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8000;

const cors = require("cors");
app.use(cors({
    origin:"http://localhost:8000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(`${process.env.MONGO_CONNECTION}`).then(() => console.log("Connectd to mongoDB")).catch((error) => console.log(error));

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);


const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server running on Port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();