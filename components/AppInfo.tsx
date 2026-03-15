'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperClass } from 'swiper'
import { Autoplay} from 'swiper/modules'
import 'swiper/css'
import { appInfo, Info } from '@/data/appInfo'
import { useState, useRef } from 'react'
import { GoDotFill } from "react-icons/go"

const AppInfo = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const swiperRef = useRef<SwiperClass | null>(null)

  return (
    <div className="relative w-full max-w-3xl mx-auto lg:mt-20">

      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[Autoplay]}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        className="w-full"
      >
        {appInfo.map((info: Info) => (
          <SwiperSlide key={info.id}>
            <div className="text-center md:text-lg lg:text-3xl">
              <h4 className="text-[#f8f5ec]/50">{info.description}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center mt-4 gap-2">
        {appInfo.map((_, idx) => (
          <button
            key={idx}
            onClick={() => swiperRef.current?.slideToLoop(idx)}
            className={`transition text-2xl ${
              activeIndex === idx ? "text-[#ffefbf]" : "text-[#ffefbf]/50"
            }`}
          >
            <GoDotFill />
          </button>
        ))}
      </div>

    </div>
  )
}

export default AppInfo