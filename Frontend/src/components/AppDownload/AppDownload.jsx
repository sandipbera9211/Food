import React from 'react'
import { assets } from '../../assets/frontend_assets/assets'

const AppDownload = () => {
  return (
    <div className='!w-1/2 !mx-auto !mt-10 !p-6' id='mobileApp'>
      <p className='text-xl font-semibold '>Experience excellence at your fingertips  install the <span className='text-2xl font-extrabold font-serif text-orange-500'>DineDrop</span> now.</p>
      <div className='flex gap-9 !mt-9'>
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

export default AppDownload
