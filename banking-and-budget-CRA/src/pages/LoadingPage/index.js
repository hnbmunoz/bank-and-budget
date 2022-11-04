import React from 'react'
import Typewriter from '../../components/typewriter'

export const LoadingPage = ({showLoading}) => {
  return (
    <div className='loading'>
      <Typewriter
        display="Loading..."
      />
    </div>
  )
}

