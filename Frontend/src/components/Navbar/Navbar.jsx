import React, { useContext, useState } from 'react';
import cart from '../../assets/frontend_assets/bag_icon.png';
import search from '../../assets/frontend_assets/search_icon.png';
import { Link, useNavigate } from 'react-router-dom';
import { StroreContext } from '../../context/StroreContext';
import { assets } from '../../assets/frontend_assets/assets';

const Navbar = ({setshowlogIn}) => {
    const [menu, setMenu] = useState("home");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {getTotalAmount,token,settoken}=useContext(StroreContext);
  
  const navigate=useNavigate(); 
    const logout=()=>{
     localStorage.removeItem("token")
     settoken("")
        navigate("/")
  }
    return (
        <div className="text-orange-400 bg-white shadow-md !py-3 !px-4 rounded-2xl relative">
            <div className="flex justify-between items-center mx-auto px-4">

                {/* Logo */}
                <Link to='/'><div className="text-3xl font-extrabold font-serif bg-white">
                    DineDrop
                </div></Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center text-[16px]">
                    <ul className="flex justify-between gap-10 text-md font-semibold">
                        <Link to='/'
                            onClick={() => setMenu("home")}
                            className={`hover:text-orange-900 cursor-pointer transition-all duration-[2000ms] ${menu === "home" ? "active" : ""}`}
                        >
                            Home
                        </Link>
                        <a href='#menu'
                            onClick={() => setMenu("menu")}
                            className={`hover:text-orange-900 cursor-pointer transition-all duration-[2000ms] ${menu === "menu" ? "active" : ""}`}
                        >
                            Menu
                        </a>
                        <a href='#mobileApp'
                            onClick={() => setMenu("mobile")}
                            className={`hover:text-orange-900 cursor-pointer transition-all duration-[2000ms] ${menu === "mobile" ? "active" : ""}`}
                        >
                            Mobile App
                        </a>
                        <a href='#footer'
                            onClick={() => setMenu("contact")}
                            className={`hover:text-orange-900 cursor-pointer transition-all duration-[2000ms] ${menu === "contact" ? "active" : ""}`}
                        >
                            Contact
                        </a>
                    </ul>
                </div>

                {/* Icons and Button */}
                <div className="flex items-center justify-end gap-6">
                  <img src={search} alt="Search" className="w-6 h-6 cursor-pointer hidden sm:block" />
                  <div className="relative w-6 h-6 cursor-pointer">
                    <Link to='/cart'><img src={assets.basket_icon} alt="Cart" className="w-full h-full" /></Link>
                    <div className={getTotalAmount()===0?"":"dot"}></div>
                  </div>

                  {!token ? <button className="hidden sm:block bg-white text-orange-600 !px-4 !py-1 border rounded-full hover:bg-orange-100 font-semibold transition-all duration-[2000ms] hover:cursor-pointer" onClick={()=>setshowlogIn(true)}>Sign In</button>
                  :<div className="relative group hidden sm:block">
                      <img src={assets.profile_icon} alt="" className="cursor-pointer" />

                     <ul className="hidden z-1 w-48 absolute top-full right-0 text-white bg-black border rounded shadow group-hover:block">
                      <li onClick={()=>navigate('/myorder')} className="flex items-center !p-2 !py-2 hover:bg-gray-500 cursor-pointer hover:bg-orange-500 hover:text-black">
                        <img src={assets.bag_icon} alt="" className="!w-4 !h-4 mr-2" />
                        <p>Order</p>
                      </li>
                      <li onClick={logout} className="flex items-center !p-3 !py-2 hover:bg-orange-500 hover:text-black cursor-pointer">
                        <img src={assets.logout_icon} alt="" className="w-4 h-4 !mr-2" />
                        <p>Log Out</p>
                      </li>
                    </ul>
                  </div>
                  }

                   {/* Mobile Menu Toggle */}
                   <button className="md:hidden text-orange-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden mt-4 flex flex-col gap-4 text-center bg-white pb-4">
                    <Link to='/' onClick={() => {setMenu("home"); setIsMenuOpen(false)}} className={`block py-2 hover:text-orange-900 ${menu === "home" ? "active" : ""}`}>Home</Link>
                    <a href='#menu' onClick={() => {setMenu("menu"); setIsMenuOpen(false)}} className={`block py-2 hover:text-orange-900 ${menu === "menu" ? "active" : ""}`}>Menu</a>
                    <a href='#mobileApp' onClick={() => {setMenu("mobile"); setIsMenuOpen(false)}} className={`block py-2 hover:text-orange-900 ${menu === "mobile" ? "active" : ""}`}>Mobile App</a>
                    <a href='#footer' onClick={() => {setMenu("contact"); setIsMenuOpen(false)}} className={`block py-2 hover:text-orange-900 ${menu === "contact" ? "active" : ""}`}>Contact</a>
                    
                    {!token ? (
                        <button className="mx-auto w-fit bg-white text-orange-600 px-6 py-2 border rounded-full hover:bg-orange-100 font-semibold" onClick={() => {setshowlogIn(true); setIsMenuOpen(false)}}>Sign In</button>
                    ) : (
                        <div className="flex flex-col gap-2 items-center">
                            <div onClick={()=>{navigate('/myorder'); setIsMenuOpen(false)}} className="cursor-pointer">Orders</div>
                            <div onClick={()=>{logout(); setIsMenuOpen(false)}} className="cursor-pointer">Log Out</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;