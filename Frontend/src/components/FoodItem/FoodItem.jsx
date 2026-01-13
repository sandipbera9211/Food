import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StroreContext } from '../../context/StroreContext'

const FoodItem = ({ id, name, price, description, image }) => { 
  if (!id) return null;
  const { cartItem = {}, addtoCart, removefromCart, url } = useContext(StroreContext);
  if (!cartItem) return null;
  return (
    <div className='food-item w-[100%] !m-1 rounded-xl '>
      <div className='food-item-img-container relative'>
        <img src={url+"/images/"+image} alt="" className='food-item-image  !rounded-tl-xl !rounded-tr-xl  transition duration-1000 w-[100%] ' />
      {!cartItem[id]?(
        <img onClick={()=>addtoCart(id)} src={assets.add_icon_white} alt="Add"className='absolute !bottom-2 left-1/10 transform -translate-x-1/2 hover:cursor-pointer '/>
      ):(
        <div className='flex justify-between items-center w-full max-w-[120px] px-7 absolute bottom-2 left-[20%] transform -translate-x-1/2 bg-amber-50 rounded-3xl hover:cursor-pointer'>
          <img src={assets.remove_icon_red} alt="" onClick={()=>removefromCart(id)} className='!p-1'/>
          <p className='text-orange-500 font-extrabold'>{cartItem[id]}</p>
          <img src={assets.add_icon_green} alt="" onClick={()=>addtoCart(id)} className='!p-1' />
        </div>
      )}
      </div>
      <div className='food-item-info !p-4 !mt-2'>
        <div className='food-item-name-rating flex  justify-center'>
          <p className='text-md font-semibold text-orange-600'>{name}</p>
          <img src={assets.rating_starts} alt="" className='rating w-23 h-5 !fill-orange-900'/>
        </div>
        <p className='text-sm !mt-4 text-gray-700'>{description}</p>
        <p className='!mt-2 font-bold'>${price}</p>
      </div>
    </div>
  )
}

export default FoodItem


