import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import './LogIn.css'
import { StroreContext } from '../../context/StroreContext';
import axios from 'axios'

const LogIn = ({ setshowlogIn }) => {
  const [current, setcurrent] = useState("LogIn");
const [data,setdata]=useState({
  name:"",
  email:"",
  password:""
})
const onChangeHandler=(event)=>{
  const name=event.target.name
  const value=event.target.value
  setdata(data=>({...data,[name]:value}))
}
const {url,token,settoken}=useContext(StroreContext)
const onLogin=async(event)=>{
   event.preventDefault()
   let newUrl=url;
   if(current==="LogIn"){
         newUrl+='/api/user/login'
   }else{
       newUrl+='/api/user/register'
   }

   const response =await axios.post(newUrl,data);

   if(response.data.success){
         settoken(response.data.token);
         localStorage.setItem("token",response.data.token)
   }
   else{
    alert(response.data.message)
   }

   if(response.data.success){
  setshowlogIn(false)
}
}

  return (
    <div className="login fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
  <form onSubmit={onLogin} className="bg-white w-full max-w-[330px]   !p-6 rounded-lg shadow-lg relative flex flex-col gap-4 animate-fadeIn ">
    <div className='flex justify-between items-center'>
      <h2 className='text-xl font-semibold underline text-orange-500 decoration-black'>{current}</h2>
      <img
        src={assets.cross_icon}
        alt="Close"
        className="cursor-pointer w-4 h-4 hover:scale-110 transition"
        onClick={() => setshowlogIn(false)}
        
      />
    </div>

    <div className='flex flex-col gap-4'>
      {current === "Sign Up" && <input type="text"  name='name' onChange={onChangeHandler} value={data.name} placeholder='Enter your Name' required  className='border border-orange-500 rounded-md p-2 outline-none focus:ring-2 focus:ring-orange-300'/>}
      <input type="email" placeholder='Enter your Email' name='email' onChange={onChangeHandler} value={data.email} required  className='border border-orange-500 rounded-md p-2 outline-none focus:ring-2 focus:ring-orange-300'/>
      <input type="password" placeholder='Enter your Password' name='password' onChange={onChangeHandler} value={data.password} required className='border border-orange-500 rounded-md p-2 outline-none focus:ring-2 focus:ring-orange-300'/>
    </div>
    <button className='bg-orange-500 text-white p-2 rounded-md font-medium hover:bg-orange-600 transition'>{current === "Sign Up" ? "Create Account" : "Log In"}</button>
    <div className='flex items-start gap-2 text-sm text-gray-600'>
      <input type="checkbox" required className='mt-1 accent-orange-500'/>
      <p>By continuing, I agree to the terms of use & privacy policy</p>
    </div>
    {current === "LogIn" 
    ? <p className='text-sm text-center'>Create a new account? <span onClick={()=>setcurrent("Sign Up")} className='text-orange-500 font-semibold cursor-pointer hover:underline'>Click here</span></p>
    : <p className='text-sm text-center'>Already have an account? <span onClick={()=>setcurrent("LogIn")} className='text-orange-500 font-semibold cursor-pointer hover:underline'>Login here</span></p>
    }
  </form>
</div>
  )
}

export default LogIn;