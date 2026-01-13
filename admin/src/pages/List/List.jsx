import React, { useEffect, useState } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'
const List = ({url}) => {
  const [list,setlist]=useState([]);
  const fetchList=async()=>{
    const response=await axios.get(`${url}/api/food/list`)
    console.log(response.data)
    if(response.data.success){
      setlist(response.data.data)
    }else{
      toast.error("Error")
    }
  }
  useEffect(()=>{
    fetchList();
  },[])

  const removeFood=async(foodId)=>{
         const response=await axios.post(`${url}/api/food/remove`,{id:foodId})
         await fetchList();
         if(response.data.success){
          toast.success(response.data.message)
         }else{
          toast.error("Error")
         }
  }
  return (
    <div className='list !p-6 w-[80%]'>
     <p className='text-orange-500 text-2xl font-bold !mb-9 font-serif'>All Items List</p>
     <div className='list-table'>
        <div className="list-table-format grid grid-cols-5 gap-12 !mb- font-serif">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        <div className='w-full bg-amber-500 h-[px] !mb-4'></div>
        {list.map((item,index)=>{
          return(
            <div key={index} className='list-table-format grid grid-cols-5 gap-12 !mb-3 '>
                 <img src={`${url}/images/`+item.image} alt="" className='h-25'/>
                 <p>{item.name}</p>
                 <p>{item.category}</p>
                 <p>${item.price}</p>
                 <p className='font-semibold hover:cursor-pointer hover:text-red-500' onClick={()=>removeFood(item._id)}>X</p>
            </div>
          )
        })}
     </div>
    </div>
  )
}

export default List
