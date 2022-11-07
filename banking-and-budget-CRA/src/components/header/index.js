import React from 'react'

const Header = ({children , displayFullName}) => {
  return (
    <div className='header-container flex-row'>
      <div>
        Insert Logo Here
      </div>      
      {children}      
      <div>
        {displayFullName}
      </div>
    </div>
  )
}

export default Header