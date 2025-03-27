const express=require('express');
const bodyparser=require('body-parser');
const app=express();
const mongoose=require('mongoose');
const ProductRoutes=require('./routes/ProductRoutes');
const UserRoutes=require('./routes/UserRoutes');
const CartRoutes=require('./routes/CartRoutes');
const cors=require('cors');
const OrderRoutes=require("./routes/OrderRoutes");

mongoose.connect(db_url).then(()=>{
    console.log("DB connected.....");
}).catch(e=>{
 console.log("DB not connected....",e);
})



app.use(bodyparser.json());
app.use(cors());
const port=4000;


app.use("/",ProductRoutes);
app.use("/",UserRoutes);
app.use("/",CartRoutes);
app.use("/",OrderRoutes);


app.listen(port,()=>{
    console.log(`Port starting at....${port}`);
})
module.exports=app;
