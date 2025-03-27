import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/userSlice';

const Register = () => {
  const disPatch=useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const Register = async (event) => {
    event.preventDefault();
    try {
      if (!name || !email || !password) {
        return toast.error("Please fill up all the details..!", {
          position: 'top-right',
        });
      }
      const res = await axios.post('http://localhost:4000/register', {
        name,
        email,
        password,
      });
      console.log("Register success",res);
      localStorage.setItem("token",res.data.token)
      disPatch(setToken(res.data.token))
      navigate("/");
      toast.success("Account created successfully!", {
        position: 'top-right',
      });
      
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong. Please try again.", {
        position: 'top-right',
      });
    }
  };
  

  return (
    <div className='flex justify-center items-center h-screen'>
<form className="flex flex-col justify-around  items-center gap-9 md:p-6 py-6 w-[400px] h-[450px] text-black border-2" onSubmit={Register}>
      <h2 className="font-bold text-center text-xl md:text-3xl italic">REGISTER AS A USER</h2>
      <div className='flex items-center justify-between gap-6'>
        <label className="font-semibold text-lg md:text-xl italic">Name:</label>
        <input
          type="text"
          className="px-4 py-2 rounded-xl border-2 "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='flex items-center justify-between gap-10'>
        <label className="font-semibold text-lg md:text-xl italic">Email:</label>
        <input
          type="email"
          className="px-4 py-2 rounded-xl border-2 "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='flex items-center justify-between gap-6'>
        <label className="font-semibold text-lg md:text-xl italic">Password:</label>
        <input
          type="password"
          placeholder='Enter 6 digit password'
          className="px-4 py-2 rounded-xl text-black border-2  "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='flex items-center justify-center'>
        <button
          type="submit"
          className="py-3 mt-4  font-semibold border-2  text-xl italic rounded-xl w-[200px]"
        >
          Create Account
        </button>
      </div>
    </form>
    <ToastContainer />
    </div>
    
  );
};

export default Register;
