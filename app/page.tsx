'use client'

import Image from "next/image"
import WelcomeImg from '@/public/3D Shapes - Transparent.png'
import AppInfo from "@/components/AppInfo"
import Link from "next/link"
import { IoIosArrowRoundForward } from "react-icons/io"
import FadeContent from '@/components/FadeContent'

const Home = () => {
  return (
    <div className="relative h-screen text-[#ffefbf]">

      <FadeContent blur={true} duration={2500} ease="power2.out" initialOpacity={0}>

        <div className="flex h-full flex-col md:grid md:grid-cols-2 md:px-15">

          <div className="flex flex-col items-center pt-25 md:pt-55 font-inter">

            <section className="order-1 md:order-1 mb-4">
              <div className="text-center md:text-left">
                <h1 className="text-[60px] md:text-[70px] lg:text-[120px] font-bodoni">Momentum</h1>
                <h2 className="mb-6 text-lg md:text-2xl lg:text-[35px]">Small habits. Real momentum.</h2>
              </div>
            </section>

            <section className="order-2 md:hidden mb-4">
              <div className="flex justify-center">
                <Image
                  src={WelcomeImg}
                  alt="Welcome Image"
                />
              </div>
            </section>

            <section className="order-3 md:order-2 mb-4">
              <div>
                <AppInfo />
              </div>
            </section>

            <section className="order-4 md:order-3">
              <div>
                <Link href="/signup">
                  <button className="mt-6 flex items-center gap-2 bg-[#ffefbf] text-[#24421E] py-2 px-4 rounded-full font-medium md:text-lg lg:text-3xl lg:mt-10 lg:px-8 lg:py-4">
                    Get Started <span><IoIosArrowRoundForward /></span>
                  </button>
                </Link>
              </div>
            </section>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <Image
              src={WelcomeImg}
              alt="Welcome Image"
              width={400}
              className="mt-50 ml-15 lg:w-1000 lg:mt-30"
            />
          </div>
        </div>

      </FadeContent>

    </div>
  )
}

export default Home
