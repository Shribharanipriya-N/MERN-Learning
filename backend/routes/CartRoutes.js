const express=require('express');
const Router=express.Router();
const CartController=require('../controllers/CartController');
const auth=require('../middleware/auth');

Router.post("/cart",auth,CartController.addcart);
Router.get("/cart",auth,CartController.getcart);
Router.delete("/cart",auth,CartController.deletecart);

module.exports=Router;