'use client'

import Image from "next/image"
import WelcomeImg from '@/public/Stacking Stones - Square PNG.png'
import AppFeatures from "@/components/AppFeatures"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { IoIosArrowRoundForward } from "react-icons/io"
import FadeContent from '@/components/FadeContent'
import AppFeatures2 from "@/components/AppFeatures2"
import HowItWorks2 from "@/components/HowItWorks2"
import Footer from "@/components/Footer"

const Home = () => {
  const router = useRouter()

  const handleGetStarted = () => {
    if (window.innerWidth < 1024) {
      router.push('/build-habits')
    } else {
      router.push('/signup')
    }
  }
  return (

    <div>

      <main>

        <FadeContent blur={true} duration={1200} ease="power2.out" initialOpacity={0}>

          <section>

            <div className="relative text-[#fff5d7]">

              <div className="flex h-full flex-col md:grid md:grid-cols-2 md:px-15 lg:px-4">
                <div className="flex flex-col items-center pt-15 md:pt-55 font-inter">
                  <div className="order-1 md:order-1 mb-4 text-center md:text-left">
                    <h1 className="text-[60px] md:text-[70px] lg:text-[120px] font-bodoni">Momentum</h1>
                    <h2 className="text-lg md:text-2xl lg:text-[35px]">Small habits. Real momentum.</h2>
                  </div>

                  <div className="flex justify-center order-2 md:hidden">
                    <Image
                      src={WelcomeImg}
                      alt="Welcome Image"
                      width={250}
                      className=""
                    />
                  </div>

                  <div className="lg:hidden order-3 md:order-2">
                    <AppFeatures />
                  </div>

                  <div className="order-4 md:order-3 lg:flex lg:mr-32 lg:gap-8 lg:mt-20 font-medium md:text-lg lg:text-2xl">
                    <button onClick={handleGetStarted} className="mt-6 flex items-center gap-2 bg-[#fff5d7]  text-[#24421E] py-2 px-4 rounded-full lg:mt-10 lg:px-8 lg:py-4 lg:bg-transparent lg:border-2 lg:border-[#fff5d7] lg:text-[#fff5d7]">
                      Get Started <span className="hidden lg:flex"><IoIosArrowRoundForward /></span>
                    </button>
                    <Link href='#features'>
                      <button className="hidden lg:flex mt-10 px-8 py-5 items-center gap-2 bg-[#fff5d7] text-[#24421E] rounded-full">
                        Learn More <span><IoIosArrowRoundForward /></span>
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center">
                  <Image
                    src={WelcomeImg}
                    alt="Welcome Image"
                    className="w-50 mt-50 ml-15 lg:w-1000 lg:mt-30"
                  />
                </div>
              </div>

            </div>

          </section>

          <section id="features">

            <div className="hidden lg:flex scroll-mt-24">
              <AppFeatures2 />
            </div>

          </section>

          <section>

            <div className="hidden lg:block">
              <HowItWorks2 />
            </div>

          </section>

          <section>

            <div className="hidden lg:flex">
              <Footer />
            </div>

          </section>

        </FadeContent>

      </main>

    </div>

  )
}

export default Home
