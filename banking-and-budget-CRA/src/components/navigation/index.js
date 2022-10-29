import React,{ useRef } from 'react'
import useDraggable from '../../utilities/hooks/useDraggable'

const NavigationContainer = ({children, showNav = false}) => {
  return (
    <div  className='nav-container flex-column' style={{ display: !showNav && "none" }}>     
      <NavigationWidget>
        {children}
      </NavigationWidget>
    </div>
  )
}

const NavigationWidget = ({children}) => {
  const dragRef = useRef(null);
  useDraggable(dragRef);
  return (
    <div ref={dragRef} className='nav-widget flex-column'> 
      {children}
    </div>
  )
}

const NavigationItems = ({itemName, panelIdx = 0, itemClick}) => {
  return (
    <div className='nav-items' onClick={itemClick} data-id={panelIdx}>{itemName}</div>
  )
}

export {NavigationContainer, NavigationWidget, NavigationItems}