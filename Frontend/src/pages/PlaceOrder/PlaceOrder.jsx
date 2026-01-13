import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StroreContext } from '../../context/StroreContext';
import './PlaceOrder.css';
import axios from 'axios';



const PlaceOrder = () => {
  const { getTotalAmount, token, food_list, cartItem, url, validateToken, clearUserSession } = useContext(StroreContext);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !validateToken(token)) {
      clearUserSession();
      alert("Please log in to place an order.");
      navigate('/');
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setUserId(decoded.userId);
    } catch (error) {
      console.error('Error decoding token:', error);
      clearUserSession();
      navigate('/');
    }
  }, [token, validateToken, clearUserSession, navigate]);
  const [data,setdata]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    phone:""
  })

  const onChangeHandeler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setdata(data=>({...data,[name]:value}))
  }

const order = async (event) => {
  event.preventDefault();

  if (!token || !validateToken(token)) {
    clearUserSession();
    alert("Your session has expired. Please log in again.");
    navigate('/');
    return;
  }

  try {
    let orderItem = [];
    food_list.forEach((item) => {
      if (cartItem[item._id] > 0) {
        orderItem.push({
          ...item,
          quantity: cartItem[item._id]
        });
      }
    });

    if (orderItem.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!userId) {
      alert("User ID not found. Please log in again.");
      return;
    }

    let orderData = {
      userId: userId,
      address: data,
      items: orderItem,
      amount: getTotalAmount() + 2
    };

    const response = await axios.post(
      url + "/api/order/place",
      orderData,
      {
        headers: {
          token: token  // Changed from Authorization: Bearer ${token} to match backend auth middleware
        }
      }
    );

    if (response.data && response.data.session_url) {
      window.location.replace(response.data.session_url);
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Order placement failed:", error);
    if (error.response && error.response.status === 401) {
      alert("Your session has expired. Please log in again.");
    } else {
      alert("Something went wrong while placing your order. Please try again.");
    }
  }
}
  return (
    <form onSubmit={order}>

      <div className='place-order p-5 md:p-10 min-h-[60vh]'>
      
      <div className='mt-8 flex flex-col md:flex-row justify-between gap-12'>
        <div className="left w-full md:max-w-[470px]" >
          <h2 className='font-bold text-xl text-orange-800 mb-4'>Delivery Information</h2>
         <div className='flex gap-3 mb-4'>
           <input name='firstName' onChange={onChangeHandeler} value={data.firstName} type="text" placeholder='First Name' className='w-1/2 p-2 border border-gray-300 rounded outline-orange-500' required/>
          <input name='lastName' onChange={onChangeHandeler} value={data.lastName} type="text" placeholder='Last Name'className='w-1/2 p-2 border border-gray-300 rounded outline-orange-500' required/>
         </div>
         
          <input name='email' onChange={onChangeHandeler} value={data.email} type="email" placeholder='Email Address' className='w-full mb-4 p-2 border border-gray-300 rounded outline-orange-500' required/>
          <input name='street' onChange={onChangeHandeler} value={data.street} type="text" placeholder='Street' className='w-full mb-4 p-2 border border-gray-300 rounded outline-orange-500' required/>
         
         <div className='flex gap-3 mb-4'>
          <input name='city' onChange={onChangeHandeler} value={data.city} type="text" placeholder='City'className='w-1/2 p-2 border border-gray-300 rounded outline-orange-500' required/>
          <input name='state' onChange={onChangeHandeler} value={data.state} type="text" placeholder='State'className='w-1/2 p-2 border border-gray-300 rounded outline-orange-500' required/>
         </div>
         <div><input name='phone' onChange={onChangeHandeler} value={data.phone} type="number" placeholder='Phone Number' className='w-full p-2 border border-gray-300 rounded outline-orange-500' required/></div>
        </div>
        
        <div className="right w-full md:max-w-[450px]">
           <div className='w-full'>
       <h2 className='text-orange-500 font-bold text-xl mb-4'>Cart Total</h2>
      <div>
        
        <div className="cart-total-details flex justify-between p-2">
          <p>Subtotal</p>
          <p>${ getTotalAmount()}</p>
        </div>
        <div className='bg-gray-100 h-0.5'></div>
        <div className="cart-total-details p-2 flex justify-between">
          <p>Delivery Fee</p>
          <p>${getTotalAmount()===0?0:2}</p>
        </div>
        <div className='bg-orange-500 h-0.5'></div>
        <div className="cart-total-details flex justify-between p-2">
          <p className='font-bold text-orange-500'>Total</p>
          <p className='font-bold'>${getTotalAmount()==0?0:getTotalAmount()+2}</p>
        </div>
      </div>
         <button type='submit' className='mt-8 bg-orange-500 text-white py-3 px-5 font-semibold hover:cursor-pointer hover:bg-amber-300 w-full rounded'>Proceed to Payment</button>
        
 </div>
        </div>
      </div>
    </div> 
    </form>
  )
}



export default PlaceOrder