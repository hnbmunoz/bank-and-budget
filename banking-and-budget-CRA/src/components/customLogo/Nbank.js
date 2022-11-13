import React from 'react'
import { HiOutlineEllipsisVertical } from 'react-icons/hi2'
const Nbank = () => {
  const smallBox = {
    display:"flex",
    justifyContent:"center",
    padding:"0.1rem 0.5rem",
    borderRadius:"0.6rem",
    backgroundColor:"#dc143c",
    width:"fit-content",
    height:"fit-content"
  }

  const logoStyle = {
    fontFamily:'Playfair',
    fontSize: '1.3rem'
  }

  const subLogoStyle = {
    alignItems:"center",
    fontSize: "0.8rem",
    fontFamily: "Petit Formal Script",
    color: "#FFB404"
  }
  return (
    <div  style={logoStyle}>
      <div className='flex-column'>
        <div className='flex-row' style={{alignItems:"center"}}>
          <div style= {smallBox}>
            N
          </div>  
          <div className='flex-column' >
            <HiOutlineEllipsisVertical fontSize="1.3rem"/>
          </div>      
          <div >
            Bank
          </div>
        </div>
        <div className='flex-row' style={subLogoStyle}>
          <div >
            Let's work together
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nbank