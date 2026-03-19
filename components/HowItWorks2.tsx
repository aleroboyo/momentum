'use client'

import { howItWorks, Steps } from "@/data/howItWorks"
import Image from "next/image"
import FadeContent from "./FadeContent"

const HowItWorks2 = () => {
    return (

        <div className="bg-white font-inter py-26">

            <FadeContent blur={true} duration={1200} ease="power2.out" initialOpacity={0}>

                <h2 className="text-3xl font-semibold text-[#353535] text-center pb-10">
                    How It Works
                </h2>

                <div className="flex gap-8 justify-center">
                    {howItWorks.map((step: Steps, index) => {
                        const StepIcon = step.stepNoIcon

                        const isDark = index % 2 === 1

                        return (
                            <div
                                key={step.id}
                                className={`rounded-4xl shadow-2xl shadow-gray-500 flex flex-col items-center py-4 px-6 w-90 h-100
                                ${isDark 
                                    ? "bg-[#1a521c] text-white" 
                                    : "bg-[#fff5d7] text-[#353535]"
                                }`}
                            >
                                <div className="mb-2 flex mr-74">
                                    {StepIcon && <StepIcon size={50} />}
                                </div>

                                <div>
                                    <Image
                                        src={step.icon}
                                        alt={step.name}
                                        width={150}
                                        height={150}
                                    />
                                </div>

                                <h3 className="font-semibold text-2xl mb-8">
                                    {step.name}
                                </h3>

                                <p className="text-lg">
                                    {step.description}
                                </p>
                            </div>
                        )
                    })}
                </div>

            </FadeContent>
            
        </div>

    )
}

export default HowItWorks2
