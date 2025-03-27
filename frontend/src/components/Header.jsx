import React ,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCart } from '../redux/CartSlice';
import axios from '../helpers/axios-config';

const Header = () => {
  const token = useSelector((state) => {
    return state.user.token;
  });
  const disPatch=useDispatch();
  const value=useSelector((state)=>state.cart.products);
  
    useEffect(()=>{
      if(token){
      getcartitems();
    }
    },[token])
 
  
  const getcartitems=async()=>{
    const res=await  axios.get("http://localhost:4000/cart", {
     headers: {
         Authorization: `Bearer ${token}`
     }
    })
    disPatch(setCart(res.data.productDetails));
    
}
  return (
    <>
    <div className='flex justify-end items-center gap-10 mr-12 h-[90px] border-2 border-gray-400 ml-12 rounded-2xl   font-semibold'>
        <div className='flex gap-7 font-semibold text-xl pr-5'>
            <Link to='/'>Home</Link>
            <Link >About</Link>
            <Link to='/cart'>Cart {value.length}</Link>
            <Link>My Orders</Link>
            <Link to='/login'>{token==null ?"Login":"Logout"}</Link>
        </div>
    </div>

    </>
  )
}

export default Header
