const express=require('express');
const Router=express.Router();
const auth =require('../middleware/auth')
const OrderController=require('../controllers/OrderController');


Router.post("/order",auth,OrderController.makeorder);
Router.get("/order",auth,OrderController.getorder);
module.exports=Router;