import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/frontend_assets/assets'
const ExploreMenu = ({category,setcategory}) => {
  return (
    <div id='menu'>
      <h1 className='text-2xl font-bold text-red-950'>Explore our Menu  </h1>
      <p className='flex flex-col !py-4 text-orange-500'>Discover delicious dishes made with fresh ingredients. Something for every taste!</p>
      <div className='flex items-center gap-8 text-center overflow-x-scroll menu-list'>
        {menu_list.map((item,index)=>{
          return(
            <div onClick={()=>setcategory(prev=>prev===item.menu_name ? "All":item.menu_name)} key={index} className='min-w-[80px] flex flex-col items-center cursor-pointer'> 
       <img 
  src={item.menu_image} 
  alt="" 
  className={`w-[7.5vw] min-w-[80px] rounded-[50%] transition-all duration-100 hover:cursor-pointer ${
    category === item.menu_name ? "active" : ""
  }`} 
/>

        
    <p className={`mt-2 font-semibold hover:cursor-pointer menu ${category===item.menu_name?"active":""}`}
>
  {item.menu_name}
</p>
 </div> 
            )
        })} 
      </div>
    </div>
  )
}

export default ExploreMenu
