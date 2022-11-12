import React, { useState, useEffect} from 'react'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

export const Shifting = ({children}) => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  
  useEffect(() => {
   let carouselItems = document.querySelectorAll('[data-carousel]')
   if (carouselIndex > carouselItems.length -1  ) setCarouselIndex(0)
   if (carouselIndex < 0  ) setCarouselIndex(carouselItems.length -1)
    
   carouselItems.forEach((item, idx) => {
    item.classList.add('hide-carousel-item')
    if (carouselIndex <= idx ) {
      item.classList.remove('hide-carousel-item')
    }
   })
  },[carouselIndex])

  const shiftLeft = () => {    
    setCarouselIndex(prevIndex => prevIndex -1)
  }

  const shiftRight = () => {
    setCarouselIndex(prevIndex => prevIndex +1)
  }
  return (
    <div className='shift-container flex-row'>
      {children}
      <button  onClick={shiftLeft}>
        <IoIosArrowDropleftCircle className="arrow-left" fontSize="3rem" color="#ccc"/>  
      </button>
      <button  onClick={shiftRight}>
        <IoIosArrowDroprightCircle className= "arrow-right" fontSize="3rem" color="#ccc"/>  
      </button>
    </div>
  )
}

