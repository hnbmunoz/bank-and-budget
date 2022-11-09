import React,{ useRef, useEffect } from 'react'
import useDraggable from '../../utilities/hooks/useDraggable'
import { ToggleButton } from '../button';
import { NavToggler } from './navIcons';

export const NavigationContainer = ({children, showNav = false, navToggle, selectedPanel=0}) => {
  return (
    <div  className='nav-container flex-column' style={{ display: !showNav && "none" }}>     
      <NavigationWidget isOpen={navToggle} selectedPanel={selectedPanel}>
        {children}
      </NavigationWidget>
    </div>
  )
}

export const NavigationWidget = ({children, isOpen, selectedPanel=0}) => {
  useEffect(() => {    
    let targetEl = document.querySelectorAll(".nav-items");
    targetEl.forEach((item, idx) => {
      selectedPanel == idx
        ? item.classList.add("active-items")
        : item.classList.remove("active-items");
    });
  }, [selectedPanel, isOpen]);
  // const [openNav, setOpenNav] = useState(true);
  const dragRef = useRef(null);
  useDraggable(dragRef);
  return (
    <div 
      ref={dragRef}
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
    <div className={`nav-items flex-row ${!navOpen && 'close-item'}`} onClick={itemClick} data-id={panelIdx}>
      {navIcon}
      {navOpen && itemName}
    </div>
  )
}

