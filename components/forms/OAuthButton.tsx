import React from 'react'
import Image from 'next/image'
import githubIcon from '@/public/icons/github-icon.svg'
const OAuthButton = ({label, icon} : {label: string, icon: string, className?: string}) => (

    <button className={`border border-zinc-400 w-full py-2 rounded font-normal flex items-center justify-center gap-2 cursor-pointer hover:bg-stone-200`}>
        <Image src={icon} alt='githb' className='object-contain w-5'></Image>

       {label}
    </button>
)

export default OAuthButton