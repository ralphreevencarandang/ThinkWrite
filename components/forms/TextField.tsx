import React from 'react'
import { useForm } from 'react-hook-form'


const TextField = () => {
    const {register,} = useForm();
  return (
    <div>
        <input {...register}/>
    </div>
  )
}

export default TextField