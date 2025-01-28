const mongoose = require("mongoose");

const OrderHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: process.env.USER_MODEL_NAME
    },
    order: [
        {
            productId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: process.env.PRODUCT_MODEL_NAME
            },
            quantity: Number
        },
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

mongoose.model(process.env.ORDER_HISTORY_MODEL_NAME, OrderHistorySchema, process.env.ORDER_HISTORY_COLLECTION_NAME);