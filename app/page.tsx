'use client'

import Link from "next/link"
import { IoIosArrowRoundForward } from "react-icons/io"

const Home = () => {
  return (
    <div className="bg-linear-to-b from-[#0d4212] to-[#010602] h-screen text-[#ffefbf]">

      <div className="flex flex-col items-center pt-50 font-inter">
        <h1 className="text-[60px] font-bodoni mb-6">Momentum</h1>
        <h2>Small habits. Real momentum.</h2>
        <h4>Build habits that move your life forward.</h4>
        <Link href='/signup'>
          <button className="mt-8 flex items-center gap-2 bg-[#ffefbf] text-[#24421E] py-2 px-4 rounded-full font-medium">Get Started <span><IoIosArrowRoundForward /></span></button>
        </Link>
      </div>

    </div>
  )
}

export default Home
