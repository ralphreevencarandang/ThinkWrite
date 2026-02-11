import React from 'react'
import Image from 'next/image'
const OAuthButton = ({label, icon} : {label: string, icon: string, className?: string}) => (

    <button className={`border w-full py-2 rounded font-normal flex items-center justify-center gap-2 cursor-pointer `}>
        <Image src={icon} alt='githb' className='object-contain w-5'></Image>

       {label}
    </button>
)

export default OAuthButton