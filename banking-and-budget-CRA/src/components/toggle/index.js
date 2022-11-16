import React,{ useState, useRef } from 'react'

const DefaultToggle = ({toggleName="", isAble = true}) => {
  const [isDisabled, setIsDisabled] = useState(false)
  const toggleClick = (e) => {
    setIsDisabled(!isDisabled);
  }
  return (
    <div className='default-toggle-container'>
      <label className='toggle-element'>
        <input name={`${toggleName}`} type='checkbox' className='toggle-switch' onClick={toggleClick} checked={isDisabled}></input>
        <span className='toggle'></span>
      </label>
    </div>
  )
}

export default DefaultToggle