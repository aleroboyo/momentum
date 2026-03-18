'use client'

import Image from "next/image"
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperClass } from 'swiper'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { howItWorks, Steps } from '@/data/howItWorks'
import { useState, useRef } from 'react'
import { GoDotFill } from "react-icons/go"

const HowItWorks = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const swiperRef = useRef<SwiperClass | null>(null)

  // Map steps to cards
  const cards = howItWorks.map((step: Steps) => {
    const StepIcon = step.stepNoIcon

    return (
      <div
        key={step.id}
        className="flex flex-col bg-[#fff5d7] text-[#24421E] p-6 rounded-4xl border-4 border-blue-50 w-full h-80 md:h-96 "
      >
        {StepIcon && <StepIcon size={40} className="mb-4" />}
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <Image src={step.icon} alt={step.name} width={100} height={100} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-center">{step.name}</h2>
          <p className="text-center text-sm md:text-base">{step.description}</p>
        </div>
      </div>
    )
  })

  return (
    <div className="font-inter min-h-screen flex flex-col items-center py-3 md:py-16 px-6 text-[#fff5d7]">
      
      {/* Heading */}
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-center mb-12">
        HOW IT WORKS
      </h2>

      {/* Swiper */}
      <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          modules={[Autoplay]}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={30}
          slidesPerView={1}
        >
          {cards.map((card, idx) => (
            <SwiperSlide key={idx} className="flex justify-center items-center">
              {card}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Dots */}
        <div className="flex justify-center mt-6 gap-3">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => swiperRef.current?.slideToLoop(idx)}
              className={`transition-all duration-300 ease-in-out text-2xl cursor-pointer ${
                activeIndex === idx
                  ? "text-[#fff5d7]  scale-125 opacity-100"
                  : "text-[#fff5d7]/50 scale-100 opacity-70"
              }`}
            >
              <GoDotFill />
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="mt-12">
        <Link href="/signup">
          <button className="font-inter flex items-center gap-2 bg-[#fff5d7] text-[#24421E] py-3 px-8 rounded-full md:text-lg shadow-lg hover:shadow-xl">
            Continue
          </button>
        </Link>
      </div>
    </div>
  )
}

export default HowItWorks
