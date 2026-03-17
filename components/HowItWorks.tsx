'use client'

import Image from "next/image"
import CardSwap, { Card } from "@/components/CardSwap"
import { howItWorks, Steps } from "@/data/howItWorks"
import Link from "next/link"

const HowItWorks = () => {

  return (
    <div className="font-inter relative w-full h-screen flex ">

      <h2 className="text-[#ffefbf] mt-16 ml-12 text-2xl md:text-3xl font-semibold">
        HOW IT WORKS
      </h2>

      <CardSwap
        width={330}
        height={550}
        cardDistance={60}
        verticalDistance={100}
        delay={4000}
        skewAmount={6}
        easing="elastic"
        pauseOnHover={true}
      >
        {howItWorks.map((step: Steps, index) => {
          const StepIcon = step.stepNoIcon

          return (
            <Card
              key={step.id}
              customClass="flex flex-col items-center justify-center bg-[#fff5d7] text-white p-6 shadow-xl shadow-[#ffefbf] ring-2 ring-[#ffefbf]"
              onClick={() => console.log("Clicked card:", index)}
            >
              
              <div className="mb-2 flex mr-44">
                {StepIcon && <StepIcon size={50} />}
              </div>

              <div className="mb-4">
                <Image
                  src={step.icon}
                  alt={step.name}
                  width={250}
                  height={250}
                />
              </div>

              <h2 className="text-2xl font-bold mb-2">
                {step.name}
              </h2>

              <p className="text-xl text-center">
                {step.description}
              </p>

            </Card>
          )
        })}
      </CardSwap>

      <Link href='/signup'>
        <button className="absolute bottom-24 right-33 md:right-80 md:bottom-36 lg:hidden font-inter flex items-center gap-2 bg-[#ffefbf] text-[#24421E] py-2 px-4 rounded-full md:text-lg">
          Continue
        </button>
      </Link>

    </div>
  );
};

export default HowItWorks
