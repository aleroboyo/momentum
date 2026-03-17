'use client'

import { useRef } from "react"
import { appFeatures, Feature } from "@/data/appFeatures"
import Image from "next/image"
import AnimatedContent from "@/components/AnimatedContent"

const AppFeatures2 = () => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])

  return (
    <div className="w-full font-inter text-[#353535] bg-[#fff5d7] py-14 px-6">

      <h3 className="text-4xl text-center font-semibold pb-12">
        Features
      </h3>

      <div>

        {appFeatures.map((feature: Feature, index) => {

          const isReversed = index % 2 !== 0

          return (
            <div
              key={feature.id}
              ref={(el) => { sectionsRef.current[index] = el }}
              className="flex justify-center flex-row items-center gap-12 mb-20"
            >

              <AnimatedContent
                direction="horizontal"
                reverse={!isReversed} 
                distance={120}
                className={`${isReversed ? "order-2" : "order-1"}`}
              >
                <Image
                  src={feature.icon}
                  alt={feature.name}
                  width={500}
                  height={500}
                  className="rounded-4xl shadow-2xl shadow-gray-400"
                />
              </AnimatedContent>

              <AnimatedContent
                direction="horizontal"
                reverse={isReversed}
                distance={120}
                className={`${isReversed ? "order-1" : "order-2"} max-w-md`}
              >
                <div className="">
                  <h4 className="text-2xl font-medium mb-4">
                    {feature.name}
                  </h4>

                  <p className="text-lg">
                    {feature.description}
                  </p>
                </div>
              </AnimatedContent>

            </div>
          )
        })}

      </div>

    </div>
  )
}

export default AppFeatures2