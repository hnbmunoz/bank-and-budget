import React from 'react'

const NavigationContainer = ({children}) => {
  return (
    <div  className='nav-container flex-column'>     
      <NavigationWidget>
        {children}
      </NavigationWidget>
    </div>
  )
}

const NavigationWidget = ({children}) => {
  return (
    <div  className='nav-widget flex-column'> 
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