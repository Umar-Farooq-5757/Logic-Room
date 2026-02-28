import React from 'react'

const Editor = ({code}) => {
  return (
    <div className='font-mono h-full'>
      <textarea className='font-mono bg-gray-100 w-full h-full outline-none' name="" id="" placeholder='// type code here' value={code}></textarea>
    </div>
  )
}

export default Editor
