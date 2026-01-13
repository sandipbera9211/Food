import React, { useContext } from 'react'
import './Cart.css'
import {StroreContext} from '../../context/StroreContext'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
const Navigate=useNavigate();
  const {cartItem,food_list,removefromCart, getTotalAmount,url}=useContext(StroreContext);



  return (
    <div className='cart !p-5 md:!p-10 min-h-[60vh]'>
      <div>
        <div className='hidden sm:grid grid-cols-6 gap-8 font-bold !pl-2 text-orange-500 items-center text-center sm:text-left'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
          <div className='bg-orange-400 h-[1px] hidden sm:block'></div>
          {food_list.map((item,index)=>{
            if(cartItem[item._id]>0){
              return(
                <div key={item._id} >
                <div className='flex flex-col sm:grid sm:grid-cols-6 gap-4 sm:gap-8 mt-5 p-4 sm:p-0 shadow sm:shadow-none rounded-lg sm:rounded-none items-center text-center sm:text-left'>
                  <img src={url+"/images/"+item.image} alt="" className='w-full sm:w-20 sm:h-auto object-cover rounded'/>
                  <div className="sm:hidden font-bold text-lg">{item.name}</div>
                  <p className="hidden sm:block">{item.name}</p>
                  
                  <div className="flex justify-between w-full sm:w-auto sm:contents items-center">
                    <span className="sm:hidden font-bold">Price:</span>
                    <p>${item.price}</p>
                  </div>
                  
                  <div className="flex justify-between w-full sm:w-auto sm:contents items-center">
                     <span className="sm:hidden font-bold">Quantity:</span>
                     <p>{cartItem[item._id]}</p>
                  </div>

                  <div className="flex justify-between w-full sm:w-auto sm:contents items-center">
                    <span className="sm:hidden font-bold">Total:</span>
                    <p>${item.price*cartItem[item._id]}</p>
                  </div>

                  <p className='font-semibold text-red-600 cursor-pointer sm:text-center' onClick={()=>(removefromCart(item._id))}>
                    <span className="sm:hidden border border-red-600 px-4 py-1 rounded hover:bg-red-600 hover:text-white transition">Remove</span>
                    <span className="hidden sm:inline">X</span>
                  </p>
                </div>
                </div>
              )
            }
          })}
      </div>

      <div className='!mt-12 flex flex-col-reverse md:flex-row justify-between gap-12'>
         <div className='w-full md:max-w-[350px]'>
            <p className='text-gray-600 mb-2'>Enter Promocode if you have</p>
            <div className='mb-4 bg-gray-200 flex justify-between rounded overflow-hidden'>
              <input type="text" placeholder='Promocode' className='bg-transparent outline-none pl-4 py-2 w-full'/>
              <button className='bg-black text-white py-3 px-8 hover:bg-gray-500 hover:cursor-pointer'>Submit</button>
            </div>
         </div>

         <div className='w-full md:max-w-[450px] p-2'>
            <h2 className='text-orange-500 font-bold text-xl mb-5'>Cart Total</h2>
            <div>
              <div className="cart-total-details flex justify-between p-3">
                <p>Subtotal</p>
                <p>${ getTotalAmount()}</p>
              </div>
              <div className='bg-gray-100 h-0.5'></div>
              <div className="cart-total-details p-3 flex justify-between">
                <p>Delivery Fee</p>
                <p>${getTotalAmount()===0?0:2}</p>
              </div>
              <div className='bg-orange-500 h-0.5'></div>
              <div className="cart-total-details flex justify-between !p-3">
                <p className='font-bold text-orange-500'>Total</p>
                <p className='font-bold'>${getTotalAmount()==0?0:getTotalAmount()+2}</p>
              </div>
            </div>
             <button onClick={()=>Navigate('/order')} className='bg-orange-500 text-white !py-3 px-5 font-semibold hover:cursor-pointer hover:bg-amber-300 w-full mt-4 rounded'>PROCEED TO CHECKOUT</button>
         </div>
      </div>
    </div>
  )
}

export default Cart