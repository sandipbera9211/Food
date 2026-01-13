import React, { useContext } from 'react'

import { StroreContext } from '../../context/StroreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StroreContext)

  if (!food_list || food_list.length === 0) {
    return (
      <div className='!mt-12' id='food-d'>
        <h2 className='text-2xl font-bold text-red-700 !mb-3'>Loading dishes...</h2>
      </div>
    )
  }

  return (
    <div className='!mt-12' id='food-d'>
      <h2 className='text-2xl font-bold text-red-700 !mb-3'>Top Dishes Near You</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 !gap-3 gap-y-8'>
        {food_list
          .filter(item => category === "All" || item.category === category)
          .map((item, index) => (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))}
      </div>
    </div>
  )
}

export default FoodDisplay
