const mongoose=require('mongoose');

const ProductSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    rating:{
      rate:{
        type:Number,
      },
      count:{
        type:Number,
      }
    },
    price:{
        type:Number,
        required:true,
    },
    availability:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    }
})

const ProductModel=mongoose.model('Product',ProductSchema);
module.exports=ProductModel;