'use client'

import Hamburger from "@/components/Hamburger"
import Link from "next/link"
import { IoIosArrowRoundForward } from "react-icons/io"
import SignUpForm from "@/components/SignUpForm"

const Signup = () => {
  return (
    <div>

      <div className="hidden lg:block">
        <Hamburger />
      </div>

      <div className="px-4 font-inter md:text-lg lg:text-xl md:mx-24 lg:mx-120">

        <h3 className="text-2xl text-center mb-4 font-medium text-[#fff5d7] mt-4  md:text-4xl md:py-10 lg:text-5xl">Get Started</h3>

        <div>
          <h4 className="rounded-4xl bg-[#fff5d7] border-4 border-blue-50 flex flex-col items-center px-2 py-4 my-6 font-bodoni md:flex-row md:justify-center md:gap-2 md:mb-10">Already have an account?
            <span>
              <Link href='/login'><button className="flex items-center border-b">Click here to Log in  <span><IoIosArrowRoundForward /></span> </button></Link>
            </span>
          </h4>

          <div>
            <SignUpForm />
          </div>

        </div>

      </div>

    </div>
  )
}

export default Signup
