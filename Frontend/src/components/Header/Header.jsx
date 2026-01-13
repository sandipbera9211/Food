import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import './Header.css'
import { useNavigate } from 'react-router-dom'

const Header = () => {
   const navigate=useNavigate()
  return (
    <div
      className="header !mx-2"
      style={{ backgroundImage: `url(${assets.header_img})` }}
    >
      <div className='header-contents absolute flex flex-col gap-[1.5vw] items-start max-w-[65%] md:max-w-[50%] bottom-[10%] left-[6vw]'>
        <h2 className="font-bold text-[max(4.5vw,22px)] md:text-[max(3vw,2rem)] text-white">
          Order your Favourite Food here..
        </h2>
        <p className='text-md font-semibold text-white md:text-gray-300 hidden sm:block'>
          Delicious meals delivered hot and fresh to your doorstep.
        </p>
        <button onClick={()=>navigate('/')} className='border-none text-black font-semibold !px-4 !py-3 bg-white rounded-3xl hover:bg-amber-400 hover:text-white'>
          View Menu
        </button>
      </div>
    </div>
  )
}

export default Header
