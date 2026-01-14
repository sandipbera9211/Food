import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import AppDownload from '../../components/AppDownload/AppDownload';
const Home = () => {
  const [category, setcategory] = useState("All");
  return (
    <div className='lg:!mx-32 md:!mx-0'>
        <Header />
        <ExploreMenu category={category} setcategory={setcategory} />
        <ErrorBoundary>
          <FoodDisplay category={category} />
        </ErrorBoundary>
        <AppDownload />
      </div>
  )
}

export default Home
