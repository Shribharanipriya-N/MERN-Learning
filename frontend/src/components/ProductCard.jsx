import React from 'react'
import { addproduct } from '../redux/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const ProductCard = (props) => {
  const token=useSelector((state)=>state.user.token);
  const navigate=useNavigate();
  const cartitems=useSelector((state)=> state.cart.products);
  const incart=cartitems.some((e)=>e.id===props.product.id);


    const product=props.product;
    const disPatch=useDispatch();
    const handlecart=async()=>{
      if(incart){
        navigate('/cart')
      }
      else{
        console.log("handlecart called")
        console.log(props.product.id);
        const  res=await axios.post("http://localhost:4000/cart", {
          productid:props.product.id,
          quantity:1,
        },{
          headers:{
            Authorization:`Bearer ${token}`,
          },
        })
        disPatch(addproduct(props.product));
      }
      
    }
  return (
    <div className=' border-2 border-inherit flex flex-col w-[350px] rounded-xl  m-5 p-2 gap-5 items-center '>
        <img className='w-[300px] h-[300px]' src={product.image} alt=""  />
        <h3 className='font-semibold text-xl'>{product.title}</h3>
        <p>{product.description}</p>

        <div className=' text-lg flex gap-14'>
            <span><b>Price </b>{product.price}</span>
            <span><b>Rating </b>{product.rating.rate}</span>
        </div>

        <div className='flex justify-center'>
            <button className='border p-2 rounded-xl font-bold' onClick={handlecart}>{incart?'Go to cart':'Add to cart'}</button>
        </div>
    </div>
  )
}

export default ProductCard