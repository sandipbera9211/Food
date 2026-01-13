import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'  // Make sure this path is correct
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LogIn from './components/LogIn/LogIn'
import Verify from './components/Verify/Verify'
function App() {
  const [showlogIn, setshowlogIn]=useState(false);
  return (
   <>
   {showlogIn?<LogIn setshowlogIn={setshowlogIn}/>:<></>}
    <div className='app'>
    <Navbar setshowlogIn={setshowlogIn}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/verify' element={<Verify/>} />
      </Routes>
    </div>
    <Footer/>
   </>
  )
}

export default App
