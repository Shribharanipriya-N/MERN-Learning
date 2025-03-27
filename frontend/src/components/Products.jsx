
import '../App.css'
import ProductCard from './ProductCard';
import {products} from '../constants';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [productlist,setproductlist]=useState([]);
  useEffect(()=>{
    getproducts();
  },[])
  const getproducts=async()=>{
const res=await axios.get('http://localhost:4000/product');
 setproductlist(res.data);
  }
  return (
    <div className='flex flex-wrap justify-around'>
    {
        productlist.map((product)=><ProductCard key={product.id} product={product}/>)
    }
    
    </div>
    
  )
}

export default Products
