"use client"

import { useState } from 'react'
import Image from 'next/image'
import { IoEyeSharp, IoEyeOffSharp } from "react-icons/io5"

const PasswordVisibility = ({ placeholder, value, onChange, name, width = "w-full" }: { placeholder: string; value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; name?: string; width?: string }) => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <>
            <div className='font-inter relative flex flex-col'>
                <label className='text-[14px] md:text-lg font-bold text-left'>Password</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    className={`w-full h-10 border border-[#bcbbbb] rounded-md p-2 ${width} focus:ring-4 focus:ring-blue-200 focus:outline-none`}
                    value={value}
                    onChange={onChange}
                    name={name}
                />
                <button type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-2 top-8 md:top-9'
                >
                    {showPassword ? <IoEyeOffSharp size={20} /> : <IoEyeSharp size={20} />}
                </button>
            </div>
        </>
    )
}


export default PasswordVisibility