const mongoose = require('mongoose');

const OrderSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true,
    },
    userid:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    orderDate:{
        type:Date,
        required:true
    },
    delDate:{
        type:Date,
        required:true
    },
    amount:{
        type:Number,

    },
    orderStatus:{
        type:String,

    },
    products:[{
        productid:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        }
    }]


})




const OrderModel= mongoose.model("Orders",OrderSchema);
module.exports=OrderModel;