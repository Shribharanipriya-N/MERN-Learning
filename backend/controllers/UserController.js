const User=require('../models/UserModel');
const {v4}=require('uuid');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const getalluser=async(req,res)=>{
    try{
        const users=await User.find();
        res.status(200).send(users);
    }
    catch(e){
        res.status(400).send({message:"User not found"},e);
    }
}

const register = async (req, res) => {
    const { email, name, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).send({ message: "User Already Found" });
        } else {
            const newuser = new User({ id: v4(), email, name, password });
            await newuser.save();
            const token = jwt.sign({ id: newuser._id }, "secrettoken", {
                expiresIn: "1h",
            });
            return res.json({ token, message: "Register success" });
        }
    } catch (e) {
        res.status(400).send({ message: "Can't create user" });
    }
}



const loginuser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
           return res.status(401).json({message:"User not found"});
        }
        const isvalidPassword= await bcrypt.compare(password,user.password);
        if(!isvalidPassword){
           return res.status(401).json({message:"Invalid password"});
        }
        const token=jwt.sign({id:user._id,email:user.email},"secrettoken",{
            expiresIn:"1h",
        });
        return res.status(200).json({message: "Login success",token });
    }
    catch(e){
        console.log(e);
    }
}

const deleteuser=async(req,res)=>{
    const id=req.params.id;
    try{
        await User.deleteOne({id});
        res.send("User deleted");
    }
    catch(e){
        res.send(e);
    }
}
const updateuser=async(req,res)=>{
    const {id}=req.params.id;
    const {name,email,password}=req.body;
    try{
    const user=await User.findOne(id);
    if(user){
       user.name = name;
       user.email = email;
       const salt = await bcrypt.genSalt(10);
       user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(200).send("User updated");
    }
    else{
        res.status(400).send("user not found");
    }
    }
    catch(e){
        res.status(400).send("Can't update the product");
    }
}

module.exports={register,getalluser,updateuser,loginuser,deleteuser};