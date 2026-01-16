import React from 'react'

const Button = ({label} : {label: string}) => {
  return (
    <button className='bg-black text-white text-sm px-3 py-2 rounded-full hover:bg-gray-900 cursor-pointer'>{label}</button>

  )
}

export default Button