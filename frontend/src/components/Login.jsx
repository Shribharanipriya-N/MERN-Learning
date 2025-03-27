import React, { useState } from 'react'
import '../App.css'
import { Link, useNavigate,useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/userSlice';


const Login = () => {
  const disPatch=useDispatch();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();
  const [searchparams,setsearchparams]=useSearchParams();
  // const returnto=

  const login = async (e) => {
    console.log("success")
    const payload={
        email:Email,
        password:Password
      }
    e.preventDefault();
    try {
      if (!Email || !Password) {
        return toast.error("Please fill up all the details!", {
          position: 'top-right',
        });
      }
      const res = await axios.post('http://localhost:4000/login',  payload);
      localStorage.setItem("token",res.data.token)
      disPatch(setToken(res.data.token))
      navigate('/')
    } catch (error) {
      console.log("error",error.response.data.message);
      toast.error(error.response.data.message, {
        position: 'top-right',
      });
      console.log("error");
      
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
    <form className="flex flex-col gap-9 p-6 border-2 text-black w-[400px] h-[450px]">
      <h2 className="font-bold text-center text-3xl italic">LOGIN AS A USER</h2>
      <div className='flex items-center justify-between gap-10'>
        <label className="font-semibold text-xl italic">Email:</label>
        <input type="email" className="px-4 py-2 border-2 rounded-xl " value={Email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className='flex items-center justify-between gap-6'>
        <label className="font-semibold text-xl italic">Password:</label>
        <input type="password" className="px-4 py-2  border-2 rounded-xl  " placeholder='Enter 6 digit password' value={Password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className='flex items-center justify-center'>
        <button onClick={login} type='submit' className="py-3 mt-4 border font-semibold text-xl italic rounded-xl w-[200px]">
          Login
        </button>
      </div>
      <div className='flex justify-center'>
        <p>Don't have an account? <Link to='/signup'><b>Sign Up</b></Link></p>
      </div>
    </form>
      <ToastContainer />
    </div>
  )
}

export default Login
