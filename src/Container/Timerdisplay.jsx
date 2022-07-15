import React from 'react'

const Timerdisplay = ( props) => {
  return (
    <div>
        Time: 
      <span>{("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:</span>
      <span>{("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.</span>
      <span>{("0" + ((props.time / 10) % 100)).slice(-2)}s</span>
    </div>
  )
}

export default Timerdisplay