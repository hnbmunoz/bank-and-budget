import React from 'react'
import Nbank from '../customLogo/Nbank'

const Header = ({children , displayFullName}) => {
  return (
    <div className='header-container flex-row'>
      <div>
        <Nbank />
      </div>      
      {children}      
      <div>
        {displayFullName}
      </div>
    </div>
  )
}

export default Header