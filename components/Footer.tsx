'use client'

import Link from "next/link"
import Image from "next/image"

const Footer = () => {
    return (
        <div className="text-[#fff5d7] font-inter py-10 px-6 flex items-center gap-8">
            <div className="">
                <Link href="/">
                    <Image 
                        src='/Momentum Logo _Transparent.png' 
                        alt="Momentum Logo" 
                        width={130} 
                        height={130}
                        />
                </Link>
            </div>

            <Link href='/'>
                    <button className="hover:text-white">Home</button>
            </Link>

            <Link href='/signup'>
                <button>Sign Up</button>
            </Link>

            <Link href='/login'>
                <button>Log In</button>
            </Link>

            <a href='mailto:aleroboyo0@gmail.com'>
                <button>Contact</button>
            </a>
        </div>
    )
}

export default Footer
