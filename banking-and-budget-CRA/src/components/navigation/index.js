import React,{ useRef, useState } from 'react'
import useDraggable from '../../utilities/hooks/useDraggable'
import { ToggleButton } from '../button';
import { NavToggler } from './navIcons';

export const NavigationContainer = ({children, showNav = false, navToggle}) => {
  return (
    <div  className='nav-container flex-column' style={{ display: !showNav && "none" }}>     
      <NavigationWidget isOpen={navToggle}>
        {children}
      </NavigationWidget>
    </div>
  )
}

export const NavigationWidget = ({children, isOpen}) => {
  // const [openNav, setOpenNav] = useState(true);
  // const handleToggleNavbar = (e) => {
  //   // alert('test')
  // }
  // const dragRef = useRef(null);
  // useDraggable(dragRef);
  return (
    <div 
      // ref={dragRef}
      className='nav-widget flex-column'
    > 
      <ToggleButton>
        {<NavToggler toggleClick={isOpen}/> }
      </ToggleButton> 
      {children}
    </div>
  )
}

export const NavigationItems = ({itemName, panelIdx = 0, itemClick, navIcon, navOpen=true}) => {
  return (
    <div className={`nav-items flex-row ${!navOpen && 'close-item'}`} onClick={itemClick} data-id={panelIdx} >
      {navIcon}
      {navOpen && itemName}
    </div>
  )
}

