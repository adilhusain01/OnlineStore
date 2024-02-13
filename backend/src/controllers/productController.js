const Product = require("../models/productModel");
const User = require("../models/userModel");


//All the features are from mongoDB
const getProducts = async (req, res) => {
    try {

        //extracting the needed queries and isolate the products
        const { shipping, company, name, sort, fields, numericFilters } = req.query;
        const queryObject = {};

        if(shipping){
            queryObject.shipping = shipping === "true" ? true : false;
        }

        if(company){
            queryObject.company = company; 
        }

        if(name){
            queryObject.name = {$regex:name, $options:'i'};
        }

        if(numericFilters){
            const operatorMap = {
                '>':'$gt',
                '<':'$lt',
                '=':'$eq',
                '>=':'$gte',
                '<=':'$lte' 
            }

            const regEx = /\b(<|>|=|>=|<=)\b/g //regular expression
            let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);

            const options = ['price', 'stars'];
            filters = filters.split(',').forEach((item) => {
                const [field, operator, value] = item.split('-');
                if(options.includes(field)){
                    queryObject[field] = {[operator]: Number(value)}
                }
            })
        }

        //firstly finding the particular objects if any query
        let result = Product.find(queryObject);

        //then if sorting is provided
        if(sort){
            //sort on basis of all parameters like alphabetical order and then in the same alphabet the price etcectra
            const sortList = sort.split(',').join(' ');
            result = result.sort(sortList);
        }else{
            //and Default is sort on basis of stars
            result = result.sort('stars');
        }

        //getting the only fields we want
        if(fields){
            const selectList = fields.split(',').join(' ');
            result = result.select(selectList);
        }


        //Setting up the pagination facility
        const limit = Number(req.query.limit) || 5;
        const page = Number(req.query.page) || 1;

        const skip = (page-1)*limit;

        result = result.skip(skip).limit(limit);
        
        const products = await result; 
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
