const Order=require('../models/OrderModel');
const Cart=require('../models/CartModel');
const Product=require('../models/ProductModels');
const {v4}=require('uuid');

const makeorder=async(req,res)=>{
    const userid=req.user.id;
    const email=req.user.email;
    const {name,phone,address}=req.body;
    let orderDate = new Date().toLocaleDateString("de-DE");
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 10);
    let delDate = currentDate.toLocaleDateString("de-DE");
    const orderStatus="completed";
    try {
        const cart = await Cart.findOne({ userid });
    if (cart) {
      let subtotal = 0
      await Promise.all(
        cart.products.map(async (item) => {
          const product = await Product.findOne({ id: item.productid });
          subtotal += product.price * item.quantity
        })
      );
        const order=new Order({id:v4(),userid,email,name,phone,address,orderDate,delDate,amount:subtotal,orderStatus,products:cart.products});
        await order.save();
          await Cart.deleteOne({userid});
          res.status(200).json({message:"Order Placed..."});
    }else{
      res.status(404).json({message:"No Products found"});
    }
}catch(e){
    res.status(404).send({error:e,message:"Can't place order"});
}
    
}


const getorder=async(req,res)=>{
  const userid = req.userid; 
    const orderDetails = await Order.find({ userid });
    const allProducts = [];
    for (const order of orderDetails) {
      for (const product of order.products) {
        const productDetails = await Product.findOne({ id: product.productid });
        if (productDetails) {
          allProducts.push({
            productid: product.productid,
            quantity: product.quantity,
            delDate: order.delDate,
            title: productDetails.title, 
            price: productDetails.price, 
            image:productDetails.image
          });
        } else {
          console.error("Product not found");
        }
      }
    }
    console.log(orderDetails);
}

module.exports={makeorder,getorder};