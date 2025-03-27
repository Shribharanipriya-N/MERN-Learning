const express=require('express');
const Router=express.Router();
const ProductController=require('../controllers/ProductController');
const auth =require('../middleware/auth')

Router.get("/product",ProductController.getproducts);
Router.post("/product",ProductController.addproduct);
Router.put("/product/:id",ProductController.updateproduct);
Router.delete("product/:id",ProductController.deleteproduct);
module.exports=Router;