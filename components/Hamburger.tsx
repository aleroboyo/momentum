'use client'

import Link from "next/link"
import Image from "next/image"

const Hamburger = () => {
    return (
        <div className="relative z-20 text-[#fff5d7] font-inter py-10 px-6 flex items-center justify-between">
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

            <div className="flex gap-8 ">
                <Link href='/'>
                    <button className="hover:text-white">Home</button>
                </Link>

                <Link href='/signup'>
                    <button className="hover:text-white">Sign Up</button>
                </Link>

                <Link href='/login'>
                    <button className="hover:text-white">Log In</button>
                </Link>

                <a href='mailto:aleroboyo0@gmail.com'>
                    <button className="hover:text-white">Contact</button>
                </a>
            </div>
        </div>
    )
}

export default Hamburger
