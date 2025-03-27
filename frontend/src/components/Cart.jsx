import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
  const token=useSelector((state)=>(state.user.token));
  console.log(token);
  const [cartitems,setcartitems]=useState({productDetails:[]});
  useEffect(()=>{
    getcartitems();
  },[])  
  const getcartitems=async()=>{
    const res=await  axios.get("http://localhost:4000/cart", {
     headers: {
         Authorization:  `Bearer ${token}`
     }
    })
    setcartitems(res.data);
  }
  const handledecrease=async(item)=>{
      const payload= {
        productid: item.id,
        quantity: item.quantity - 1,
      }
      const res = await axios.post('http://localhost:4000/cart', payload, {
        headers:{
          Authorization : `Bearer ${token}`
        }
      }
      )
      setcartitems((prevItems) => ({
        ...prevItems,
        productDetails: prevItems.productDetails.map((product) =>
          product.id === item.id ? { ...product, quantity: product.quantity - 1 } : product
        ),
      }));
  
      console.log(res.data);
    }
 
    const handleincrease = async(item) => {
      const payload= {
        productid: item.id,
        quantity: item.quantity + 1,
      }
      const res = await axios.post('http://localhost:4000/cart', payload, {
        headers:{
          Authorization : `Bearer ${token}`
        }
      }
      )
      setcartitems((prevItems) => ({
        ...prevItems,
        productDetails: prevItems.productDetails.map((product) =>
          product.id === item.id ? { ...product, quantity: product.quantity + 1 } : product
        ),
      }));
  
      console.log(res.data);
    }
  return (
    <div className="p-10 ">
        <div className="flex flex-col w-[800px] gap-4 p-4">
          {cartitems.productDetails.map((item) => { 
           return(
            <div key={item.title} className="flex items-center bg-white rounded-lg border border-gray-250 p-2  justify-between">
              <img className="h-20 w-20 ml-5" src={item.image} alt={item.title} />
              <div className="flex flex-col justify-between">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <span className="text-gray-500">Price: ${item.price}</span>
                
              </div>
              <div className=' text-xl flex items-center'>
              <button className='border border-gray-400 rounded-xl w-[30px] h-[30px] font-bold' onClick={()=>handleincrease(item)} >+</button>
              <span className='p-2'>{item.quantity}</span>
              <button className='border border-gray-400 rounded-xl w-[30px] h-[30px] font-bold ' onClick={()=>handledecrease(item)}>-</button>
              </div>
            </div>
          )})}
        </div>
        <div className='w-[300px] h-[200px] border flex justify-around items-center ml-4 rounded-lg'>
          <h4 className='text-lg'><span className='font-semibold text-xl'>Total</span> {cartitems.subtotal}</h4>
          <button className='text-lg border w-[120px] h-[40px]  bg-gray-300 rounded-xl'>Pay Now</button>
        </div>
      </div>

  );
};

export default Cart;
