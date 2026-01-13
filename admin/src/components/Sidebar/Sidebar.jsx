import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import './Sidebat.css'

const Sidebar = () => {
  const [class1, setclass1] = useState("");

  return (
    <div className='sidebar !py-5 w-[18%] h-[100vh] bg-amber-200 !px-5'>
      <NavLink 
        to="/add" 
        onClick={() => setclass1("add")} 
        className={`option border flex gap-4 !p-3 ${class1 === "add" ? "active" : ""}`}
      >
        <img src={assets.add_icon} alt="" />
        <p>Add item</p>
      </NavLink>

      <NavLink 
        to="/list" 
        onClick={() => setclass1("list")}
        className={`option border flex gap-4 !p-3 !mt-7 ${class1 === "list" ? "active" : ""}`}
      >
        <img src={assets.order_icon} alt="" />
        <p>List item</p>
      </NavLink>

      <NavLink 
        to="/order" 
        onClick={() => setclass1("order")}
        className={`option border flex gap-4 !p-3 !mt-7 ${class1 === "order" ? "active" : ""}`}
      >
        <img src={assets.order_icon} alt="" className='brightness-200'/>
        <p>Orders</p>
      </NavLink>
    </div>
  )
}

export default Sidebar
