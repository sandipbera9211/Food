import React from 'react'
import {assets} from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar !h-18 flex justify-between !p-2 !mt-2 shadow-md shadow-orange-500'>
      <h2 className='text-3xl font-extrabold font-serif bg-white !mt-2 text-orange-500'>DineDrop</h2>
      <img src={assets.profile_image} alt="" className='h-[60px] w-[60px]'/>
    </div>
  )
}

export default Navbar
