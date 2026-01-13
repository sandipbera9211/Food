import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'
const Footer = () => {
  return (
    <div className='bg-gradient-to-tl from-orange-600 to-orange-300 !p-8 md:p-12 text-white mt-16' id='footer'>
      <div className='flex flex-col md:grid md:grid-cols-3 !gap-8 !md:gap-12'>
        <div className='flex flex-col items-center md:items-start text-center md:text-left'> 
            <div className='text-3xl font-extrabold font-serif'>DineDrop</div>
            <p className='!p-2 max-w-md'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas ea culpa velit eum nostrum suscipit saepe voluptatem ipsam a et quod, enim nulla ipsa?</p>
            <div className='flex !gap-2 !mt-2 !mb-4'>
                <img src={assets.facebook_icon} alt="" className="cursor-pointer hover:scale-110 transition"/>
                <img src={assets.linkedin_icon} alt="" className="cursor-pointer hover:scale-110 transition"/>
                <img src={assets.twitter_icon} alt="" className="cursor-pointer hover:scale-110 transition"/>
            </div>
        </div>
        
        <div className='flex flex-col items-center md:items-start text-center md:text-left'>
            <h2 className='text-xl font-bold mb-3'>COMPANY</h2>
             <ul className='!space-y-2 cursor-pointer'>
                <li className='hover:text-black'>Home</li>
                <li className='hover:text-black'>About Us</li>
                <li className='hover:text-black'>Delivery</li>
                <li className='hover:text-black'>Privacy Policy</li>
             </ul>
        </div>
        <div className='flex flex-col items-center md:items-start text-center md:text-left'>
            <h2 className='text-xl font-bold mb-3'>Get IN Touch</h2>
            <div className='mb-1'>+123-849-3849</div>
            <div>dinedrop@gmail.com</div>
        </div>
      </div>
      <div className='bg-amber-50 h-0.5 !my-5'></div>
      <div className='text-center'>Copyright 2025 © DineDrop.com-All Rights Reserved</div>
    </div>
  )
}

export default Footer

