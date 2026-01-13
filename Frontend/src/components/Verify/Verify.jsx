import React, { useContext, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { StroreContext } from '../../context/StroreContext';
import axios from 'axios';
const Verify = () => {




 const[searchparam,setsearchparam]=useSearchParams();
      const success=searchparam.get("success")
      const orderId=searchparam.get("orderId")
const navigate=useNavigate();
const {url}=useContext(StroreContext)
const verifyPayment = async () => {
  const response = await axios.post(url + "/api/order/verify", { success, orderId });
  console.log(response.data);

  if(response.data.success){
    navigate("/myorders")
  }else{
    navigate("/")
  }
}
useEffect(()=>{
 verifyPayment(); 
},[])
console.log(success,orderId);



  return (
    <div className='min-h-[60vh] grid place-items-center'>
     <div className='w-[100px] h-[100px] place-self-center border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin'></div>
    </div>
  )
}

export default Verify
