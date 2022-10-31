import React from 'react'

const Modal = ({children, backgroundColor="#1f1f1f"}) => {
  return (
    <div style={{backgroundColor:`${backgroundColor}`}} className='modal-container'>
      {children}
    </div>
  )
}

export default Modal