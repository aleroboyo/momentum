'use client'

import Hamburger from "@/components/Hamburger"
import Link from "next/link"
import { IoIosArrowRoundForward } from "react-icons/io"
import ForgotPasswordForm from "@/components/ForgotPasswordForm"

const ForgotPassword = () => {
  return (
    <div>

      <div className="hidden lg:block">
        <Hamburger />
      </div>

      <div className="px-4 font-inter md:text-lg md:mx-24 lg:mx-100">

        <h3 className="text-2xl text-center mt-16 lg:mt-4 font-medium text-[#fff5d7] md:text-4xl md:py-10 lg:text-4xl">Forgot Password</h3>

        <div>
          <h4 className="rounded-4xl bg-[#fff5d7] border-4 border-blue-50 flex flex-col md:flex-row items-center  px-1 py-2 md:px-2 md:py-4 my-6 font-bodoni justify-center md:mb-10 md:gap-2">Remember your Password?
            <span>
              <Link href='/login'><button className="flex items-center border-b">Back to Login  <span><IoIosArrowRoundForward /></span> </button></Link>
            </span>
          </h4>

          <div>
            <ForgotPasswordForm/>
          </div>

        </div>

      </div>

    </div>
  )
}

export default ForgotPassword
