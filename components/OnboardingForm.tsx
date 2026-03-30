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

const OnboardingForm = () => {
    const router = useRouter()
    const scrollRef = useRef<HTMLDivElement>(null)

    const [formData, setFormData] = useState({
        icon: "",
        name: "",
        frequency: "",  
        target: "",      
        unit: "",        
        customUnit: "",  
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        if (!formData.frequency) {
            alert("Please select how often")
            return
        }
        if (!formData.target) {
            alert("Please enter a target")
            return
        }
        if (!formData.unit) {
            alert("Please select a unit")
            return
        }
        if (formData.unit === "other" && !formData.customUnit.trim()) {
            alert("Please enter your custom unit")
            return
        }

        const finalUnit = formData.unit === "other" ? formData.customUnit : formData.unit

        sessionStorage.setItem("onboarding", JSON.stringify({
            ...formData,
            unit: finalUnit,
        }))

        router.push("/dashboard")
    }

    return (
        <div className="font-inter flex flex-col items-center">

            <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-[500px_2fr] gap-10">
                    <div className="text-left mb-6">

                        <h1>Pick an icon for your habit</h1>

                        <div className="flex items-center gap-2 px-6 mb-2">
                            <button type="button" onClick={() => scroll("left")} className="shrink-0 hover:scale-110 transition-transform">
                                <IoIosArrowBack size={24} />
                            </button>

                            <div ref={scrollRef} className="flex py-6 px-8 gap-3 scroll-smooth scrollbar-hide overflow-hidden">
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

                            <button type="button" onClick={() => scroll("right")} className="shrink-0 hover:scale-110 transition-transform">
                                <IoIosArrowForward size={24} />
                            </button>
                        </div>

                        <div>
                            <label className="flex flex-col mb-6">Habit Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Reading, Meditation, Exercise..."
                                className="rounded-full h-16 w-md px-3 py-4 border-2 mb-2 bg-transparent text-[#fff5d7] placeholder:text-[#fff5d7]/50 border-[#fff5d7]/50 focus:border-[#fff5d7] focus:outline-none"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className="text-left">

                        <div className="flex flex-col mb-9">
                            <label className="mb-6">How often?</label>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData((prev) => ({ ...prev, frequency: "daily" }))}
                                    className={`py-3 px-6 rounded-full md:text-lg border-2 transition-all
                                        ${formData.frequency === "daily"
                                            ? "bg-[#fff5d7] text-[#24421E] border-[#fff5d7]"
                                            : "text-[#fff5d7] bg-[#24421E] border-[#fff5d7]"
                                        }`}
                                >
                                    Daily
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData((prev) => ({ ...prev, frequency: "weekly" }))}
                                    className={`py-3 px-4 rounded-full md:text-lg border-2 transition-all
                                        ${formData.frequency === "weekly"
                                            ? "bg-[#fff5d7] text-[#24421E] border-[#fff5d7]"
                                            : "text-[#fff5d7] bg-[#24421E] border-[#fff5d7]"
                                        }`}
                                >
                                    Weekly
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-6">Target</label>
                            <div className="flex gap-4">
                                <input
                                    type="number"
                                    placeholder="e.g. 1..."
                                    className="rounded-full h-16 w-25 px-3 py-4 border-2 mb-2 bg-transparent text-[#fff5d7] placeholder:text-[#fff5d7]/50 border-[#fff5d7]/50 focus:border-[#fff5d7] focus:outline-none"
                                    name="target"
                                    value={formData.target}
                                    onChange={handleChange}
                                />
                                <select
                                    name="unit"
                                    value={formData.unit}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>unit</option>
                                    <option value="minutes">minutes</option>
                                    <option value="hours">hours</option>
                                    <option value="times">times</option>
                                    <option value="pages">pages</option>
                                    <option value="km">km</option>
                                    <option value="calories">calories</option>
                                    <option value="other">other</option>
                                </select>
                            </div>

                            {formData.unit === "other" && (
                                <input
                                    type="text"
                                    placeholder="e.g. steps, reps, glasses..."
                                    className="mt-2 rounded-full h-16 px-4 border-2 bg-transparent text-[#fff5d7] placeholder:text-[#fff5d7]/50 border-[#fff5d7]/50 focus:border-[#fff5d7] focus:outline-none"
                                    name="customUnit"
                                    value={formData.customUnit}
                                    onChange={handleChange}
                                />
                            )}
                        </div>

                    </div>
                </div>

                <div className="mt-6 md:mt-10 flex items-center justify-center gap-6">
                    <button
                        type="submit"
                        className="bg-[#fff5d7] text-[#24421E] py-3 px-4 rounded-full md:text-lg border-2 border-[#fff5d7] hover:text-[#fff5d7] hover:bg-[#24421E] hover:font-medium"
                    >
                        Create Habit
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

export default OnboardingForm