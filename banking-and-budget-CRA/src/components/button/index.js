import React from 'react'

export const CloseButton = ({onClickClose}) => {
  return (
    <div className="close-container" >
      <button  onClick={onClickClose}
        className="btn-close"
      >X</button>
    </div>
  )
}

export const NeonButton = ({displayText = "Submit", buttonClick}) => {
  return (
    <div className="neon-container">       
      <button className="btn-submit" type="" onClick={buttonClick}>
        <span className="btn-submit-eff"></span>
        <span className="btn-submit-eff"></span>
        <span className="btn-submit-eff"></span>
        <span className="btn-submit-eff"></span>
        <p>{displayText}</p>
      </button>      
    </div>
  )
}

export const ToggleButton = ({children}) => {
  return (
    <div className="toggle-container" >
      <button className="btn-toggle"> {children} </button>
    </div>
  )
}
