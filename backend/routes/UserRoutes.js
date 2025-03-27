const express=require('express');
const Router=express.Router();
const UserController=require('../controllers/UserController');


Router.get("/getalluser",UserController.getalluser);
Router.post("/register",UserController.register);
Router.put("/user/:id",UserController.updateuser);
Router.post("/login",UserController.loginuser);
Router.delete("/user/:id",UserController.deleteuser);
module.exports=Router;