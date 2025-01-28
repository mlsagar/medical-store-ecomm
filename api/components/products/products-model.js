const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    company_name: {
        type: String,
    },
    image: {
        type: String,
    },
    stock: {
        type: Number,
    },
    price: {
        type: Number
    }
})

mongoose.model(process.env.PRODUCT_MODEL_NAME, productSchema, process.env.PRODUCT_COLLECTION_NAME)