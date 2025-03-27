const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },
    products: [{
        productid: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    }],
    total:{
        type:Number,
    }
});

const CartModel = mongoose.model("Cart", CartSchema);
module.exports = CartModel;
