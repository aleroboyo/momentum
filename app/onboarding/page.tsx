'use client'

import { IoRocket } from "react-icons/io5"
import OnboardingStep1 from "@/components/OnboardingStep1"
import OnboardingForm from "@/components/OnboardingForm"

const Onboarding = () => {
    return (
        <div className="text-[#fff5d7] flex flex-col text-center mt-20 font-inter font-medium">
            <h1 className="flex items-center justify-center text-2xl md:text-4xl">You are just one step away! <IoRocket /></h1>
            <h2 className="text-lg md:text-2xl pt-2 pb-12 md:pb-24">What habit do you want to build?</h2>

            <div className="lg:hidden">
                <OnboardingStep1 />
            </div>

            <div className="hidden lg:block">
                <OnboardingForm />
            </div>

        </div>
    )
}

export default Onboarding
