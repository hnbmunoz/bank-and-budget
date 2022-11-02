import React from 'react'

const Header = ({displayFullName}) => {
  debugger
  return (
    <div className='header-container flex-row'>
      <div>
        Insert Logo Here
      </div>
      <div>
        {displayFullName}
      </div>
    </div>
  )
}

export default Header