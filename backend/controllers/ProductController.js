const Product=require('../models/ProductModels');
const {v4}=require('uuid');


const getproducts=async(req,res)=>{
    try{
        const products=await Product.find();
        res.status(200).send(products);
    }
    catch(e){
        res.status(404).send("error")
    }
}

const addproduct=async(req,res)=>{
    const {title,description,rating,price,availability,category,image}=req.body;
    try{
        const product=new Product({id:v4(),title,description,rating,price,availability,category,image});
        await product.save();
        res.status(200).send({message:"Product created..."})
    }
    catch(e){
        console.log(e);
        res.status(400).send({message:"Product not added..."});
    }
}

const updateproduct=async(req,res)=>{
    const {id}=req.params.id;
    const {title,description,rating,price,availability,image}=req.body;
    try{
    const product=await Product.findOne(id);
    if(product){
       await Product.updateOne({id,title,description,rating,price,availability,image});
       res.status(200).send("Product updated");
    }
    else{
        res.status(400).send("Product not found");
    }
    }
    catch(e){
        res.status(400).send("Can't update the product");
    }
}


const deleteproduct=async(req,res)=>{
    const {id}=req.params.id;
    try{
        const product=await Product.findOne(id);
        if(product){
            await Product.deleteOne(id);
            res.status(200).send("Product deleted...");
        }
        else{
            res.status(400).send("Product not found");
        }
    }
    catch(e){
       res.send(e);
    }
}
module.exports={getproducts,addproduct,updateproduct,deleteproduct};


