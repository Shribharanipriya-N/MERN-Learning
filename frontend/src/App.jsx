import React, { useState ,useEffect} from 'react'
import {Provider, useDispatch, useSelector} from 'react-redux'
import Products from './components/Products'
import Header from './components/Header'
import ProtectedRout from './components/ProtectedRout'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import HomeLayout from './components/HomeLayout'
import Cart from './components/Cart'
import axios from 'axios'
import Register from './components/Register'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import { setToken } from './redux/userSlice'



const App = () => {
  const disPatch=useDispatch();
  useEffect(()=>{
    const token=localStorage.getItem("token");
    if(token){
      disPatch(setToken(token));
    }
  },[])
  return (
     <BrowserRouter>
     <ToastContainer/>
     <Routes>
      <Route path='/' element={<HomeLayout/>}>
      <Route path='/' element={<Products/>}></Route>
      <Route element={<ProtectedRout/>}>
      <Route path='/cart' element={<Cart />}></Route>
      </Route>
      </Route>
      <Route path='/login' element ={<Login/>}/>
      <Route path='/signup' element={<Register/>}/>
     </Routes>
     </BrowserRouter>
  )
}

export default App
