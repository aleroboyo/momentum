'use client'

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { TiHeartFullOutline } from "react-icons/ti"
import { TbFlowerFilled, TbTargetArrow } from "react-icons/tb"
import { PiFlowerLotusFill } from "react-icons/pi"
import { FaLeaf, FaSmile, FaSmileBeam, FaRunning } from "react-icons/fa"
import { BsStars } from "react-icons/bs"
import { MdOutlineStar } from "react-icons/md"
import { RiDiamondFill } from "react-icons/ri"
import { GiWeightLiftingUp, GiWhiteBook, GiMeditation, GiNotebook, GiNightSleep } from "react-icons/gi"
import { IoWater, IoFastFood } from "react-icons/io5"
import { IoMdLaptop } from "react-icons/io"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

const icons = [
    { value: "heart", component: <TiHeartFullOutline size={24} /> },
    { value: "flower", component: <TbFlowerFilled size={24} /> },
    { value: "lotus", component: <PiFlowerLotusFill size={24} /> },
    { value: "leaf", component: <FaLeaf size={24} /> },
    { value: "smile", component: <FaSmile size={24} /> },
    { value: "stars", component: <BsStars size={24} /> },
    { value: "star", component: <MdOutlineStar size={24} /> },
    { value: "smilebeam", component: <FaSmileBeam size={24} /> },
    { value: "diamond", component: <RiDiamondFill size={24} /> },
    { value: "workout", component: <GiWeightLiftingUp size={24} /> },
    { value: "read", component: <GiWhiteBook size={24} /> },
    { value: "water", component: <IoWater size={24} /> },
    { value: "meditate", component: <GiMeditation size={24} /> },
    { value: "journal", component: <GiNotebook size={24} /> },
    { value: "sleep", component: <GiNightSleep size={24} /> },
    { value: "run", component: <FaRunning size={24} /> },
    { value: "laptop", component: <IoMdLaptop size={24} /> },
    { value: "food", component: <IoFastFood size={24} /> },
    { value: "target", component: <TbTargetArrow size={24} /> },
]

const OnboardingStep1 = () => {
    const router = useRouter()
    const scrollRef = useRef<HTMLDivElement>(null)

    const [formData, setFormData] = useState({
        icon: "",
        name: "",
    })

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current

            if (direction === "right") {
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    scrollRef.current.scrollTo({ left: 0, behavior: "smooth" })
                } else {
                    scrollRef.current.scrollBy({ left: 150, behavior: "smooth" })
                }
            } else {
                if (scrollLeft <= 10) {
                    scrollRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" })
                } else {
                    scrollRef.current.scrollBy({ left: -150, behavior: "smooth" })
                }
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.icon) {
            alert("Please pick an icon for your habit")
            return
        }

        if (!formData.name.trim()) {
            alert("Please enter a habit name")
            return
        }

        sessionStorage.setItem("onboarding", JSON.stringify(formData))
        router.push("/onboarding/step2")
    }

    return (
        <div className="mt-6 md:mt-12 flex flex-col font-inter">

            <form onSubmit={handleSubmit} className="px-1 md:px-24">

                <h1 className="flex justify-center mb-6 md:text-lg">
                    Pick an icon for your habit
                </h1>

                <div className="flex items-center gap-2 px-2 md:px-10 mb-8">

                    <button
                        type="button"
                        onClick={() => scroll("left")}
                        className="shrink-0 hover:scale-110 transition-transform"
                    >
                        <IoIosArrowBack size={24} />
                    </button>

                    <div
                        ref={scrollRef}
                        className="flex gap-3 scroll-smooth scrollbar-hide overflow-hidden"
                    >
                        {icons.map((icon) => (
                            <button
                                key={icon.value}
                                type="button"
                                onClick={() => setFormData((prev) => ({ ...prev, icon: icon.value }))}
                                className={`p-4 rounded-full border-2 shrink-0 transition-all duration-200 hover:scale-125
                                    ${formData.icon === icon.value
                                        ? "border-[#fff5d7] bg-[#fff5d7] text-[#24421E] scale-110"
                                        : "border-[#fff5d7]/30 text-[#fff5d7]"
                                    }`}
                            >
                                {icon.component}
                            </button>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => scroll("right")}
                        className="shrink-0 hover:scale-110 transition-transform"
                    >
                        <IoIosArrowForward size={24} />
                    </button>

                </div>

                <div className="px-6 md:px-20">
                    <label className="flex justify-center mb-6 md:text-lg">Habit Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Reading, Meditation, Exercise..."
                        className="rounded-full h-20 w-full px-6 py-4 border-2 mb-2 bg-transparent text-[#fff5d7] placeholder:text-[#fff5d7]/50 border-[#fff5d7]/50 focus:border-[#fff5d7] focus:outline-none"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-6 md:mt-10 flex items-center justify-center gap-2 md:gap-4">
                    <button
                        type="submit"
                        className="bg-[#fff5d7] text-[#24421E] py-3 px-4 rounded-full md:text-lg border-2 border-[#fff5d7] hover:text-[#fff5d7] hover:bg-[#24421E] hover:font-medium"
                    >
                        Continue
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push("/dashboard")}
                        className="bg-[#fff5d7] text-[#24421E] py-3 px-8 rounded-full md:text-lg border-2 border-[#fff5d7] hover:text-[#fff5d7] hover:bg-[#24421E] hover:font-medium"
                    >
                        Skip
                    </button>
                </div>

            </form>

        </div>
    )
}

export default OnboardingStep1