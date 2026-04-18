'use client'

import Link from "next/link"
import { IoIosArrowRoundForward } from "react-icons/io"
import LoginForm from "@/components/LoginForm"

const Login = () => {
  return (
    <div>

      <div className="px-4 font-inter md:text-lg md:mx-24 lg:mx-100">

        <h3 className="text-2xl text-center mt-20 lg:mt-4 mb-4 font-medium text-[#fff5d7] md:text-4xl md:py-10 lg:text-4xl">Welcome Back!</h3>

        <div>
          <h4 className="rounded-4xl bg-[#fff5d7] border-4 border-blue-50 flex flex-col items-center px-2 py-4 my-6 font-bodoni md:flex-row md:justify-center md:gap-2 md:mb-10">Do not have an account?
            <span>
              <Link href='/signup'><button className="flex items-center border-b">Create an account  <span><IoIosArrowRoundForward /></span> </button></Link>
            </span>
          </h4>

          <div>
            <LoginForm/>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Login
