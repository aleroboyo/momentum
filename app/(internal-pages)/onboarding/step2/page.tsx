'use client'

import OnboardingStep2 from "@/components/OnboardingStep2"

const Step2 = () => {
  return (
    <div className="text-[#fff5d7] flex flex-col text-center mt-20 font-inter font-medium px-6 md:px-20">
      <h1 className="flex items-center justify-center text-2xl md:text-4xl md:mb-20">How do you want to build your habit?</h1>

      <OnboardingStep2 />

    </div>
  )
}

export default Step2
