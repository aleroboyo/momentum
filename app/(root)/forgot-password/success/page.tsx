'use client'

import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"


const Success = () => {
    const [resendPhrase, setResendPhrase] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    return (
        <div className=" text-[#fff5d7]">

            <div className="px-4 font-inter md:text-lg md:mx-24 lg:mx-100">

                <div className="lg:hidden -mb-30">
                    <Image
                        src='/Paper Plane - PNG.png'
                        alt="Paper Plane Image"
                        width={500}
                        height={500}
                    />
                </div>

                <h3 className="text-2xl text-center mb-4 font-medium  md:text-4xl md:py-10 lg:text-4xl">Reset Link Sent!</h3>

                <div className="hidden lg:flex justify-center -mt-20">
                    <Image
                        src='/Envelope - Tight Transparent.png'
                        alt='Envelope Image'
                        width={500}
                        height={500}
                    />
                </div>

                <p className="font-light text-center lg:-mt-10">We have sent a password reset link to your email address. Click the link to create a new password.</p>

                <div className="flex flex-col items-center">
                    <button
                        disabled={resendPhrase}
                        onClick={() => {
                            setResendPhrase(true)
                            timeoutRef.current = setTimeout(() => {
                                setResendPhrase(false)
                            }, 30000)
                        }} className="lg:flex flex-col items-center my-6 md:flex-row disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-none md:justify-center md:gap-2 md:mb-8 font-light hover:border-b"> {resendPhrase ? 'Email Resent!' : 'Did not receive the email? Resend'}
                    </button>

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
