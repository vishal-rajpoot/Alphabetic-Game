import React from 'react'

const Buttons = (props) => {
  return (
    <>
        <button
            className="btn"
            type="button"
            onClick={() => {
                props.isActive  ? props.reset() : props.start()
            }}
        >
            {props.isActive ? 'Reset' : 'Start'}
        </button>
    </>
  )
}

export default Buttons