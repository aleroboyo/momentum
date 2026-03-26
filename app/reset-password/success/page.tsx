'use client'

import Image from "next/image"
import Link from "next/link"

const Success = () => {
    return (
        <div className=" text-[#fff5d7]">

            <div className="px-4 font-inter md:text-lg md:mx-24 lg:mx-100">

                <div className="lg:hidden md:mt-12">
                    <Image
                        src='/Shield - Transparent.png'
                        alt="Paper Plane Image"
                        width={500}
                        height={500}
                    />
                </div>

                <h3 className="text-2xl text-center mb-4 md:-mb-6 font-medium  md:text-4xl md:py-10 lg:text-4xl">Password Reset Successful!</h3>

                <p className="font-light text-center">You are all set. Your password has been updated.</p>

                <div className="hidden lg:flex justify-center">
                    <Image
                        src='/Shield - Transparent.png'
                        alt='Envelope Image'
                        width={500}
                        height={500}
                    />
                </div>

                <div className="flex justify-center">
                <Link href="/login">
                    <button className="font-inter bg-[#fff5d7] text-[#24421E] py-3 px-8 rounded-full md:text-lg border-2 border-[#fff5d7] hover:text-[#fff5d7] hover:bg-[#24421E] hover:font-medium">
                        Back to Login
                    </button>
                </Link>
                </div>

            </div>

        </div>
    )
}

export default Success
