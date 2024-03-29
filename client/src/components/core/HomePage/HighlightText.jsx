import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#8ee4fa]'>
        {" "}
        {text}
    </span>
  )
}

export default HighlightText
