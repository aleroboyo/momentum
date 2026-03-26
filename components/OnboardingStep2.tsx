'use client'

import { useState} from "react"
import { useRouter } from "next/navigation"

const OnboardingStep2 = () => {
    const router = useRouter()
  
    const [formData, setFormData] = useState({
        frequency: "",
        target: "",
        unit: "",
        customUnit: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

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

        const step1 = JSON.parse(sessionStorage.getItem("onboarding") || "{}")

        const finalUnit = formData.unit === "other" ? formData.customUnit : formData.unit

        const fullHabitData = {
            ...step1,
            frequency: formData.frequency,
            target: formData.target,
            unit: finalUnit,
        }

        sessionStorage.setItem("onboarding", JSON.stringify(fullHabitData))

        router.push("/dashboard")
    }

    return (
        <div className="mt-16  font-inter text-[#fff5d7]">

            <form onSubmit={handleSubmit}>

                <div className="px-6 md:px-20 flex flex-col items-center">

                    <div className="mb-9">
                        <label className="md:text-lg">How often?</label>
                        <div className="mt-4 flex gap-4">
                            <button
                                type="button"
                                onClick={() => setFormData((prev) => ({ ...prev, frequency: "daily" }))}
                                className={`py-3 px-8 rounded-full md:text-lg border-2 transition-all
                                    ${formData.frequency === "daily"
                                        ? "bg-[#fff5d7] text-[#24421E] border-[#fff5d7]"
                                        : "text-[#fff5d7] border-[#fff5d7]/50 hover:border-[#fff5d7]"
                                    }`}
                            >
                                Daily
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData((prev) => ({ ...prev, frequency: "weekly" }))}
                                className={`py-3 px-6 rounded-full md:text-lg border-2 transition-all
                                    ${formData.frequency === "weekly"
                                        ? "bg-[#fff5d7] text-[#24421E] border-[#fff5d7]"
                                        : "text-[#fff5d7] border-[#fff5d7]/50 hover:border-[#fff5d7]"
                                    }`}
                            >
                                Weekly
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="md:text-lg">Target</label>
                        <div className="mt-4 flex gap-4 items-center">
                            <input
                                type="number"
                                placeholder="e.g. 1..."
                                className="rounded-full h-14 w-26 px-4 border-2 bg-transparent text-[#fff5d7] placeholder:text-[#fff5d7]/50 border-[#fff5d7]/50 focus:border-[#fff5d7] focus:outline-none"
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
                                className="mt-4 rounded-full h-14 px-6 border-2 bg-transparent text-[#fff5d7] placeholder:text-[#fff5d7]/50 border-[#fff5d7]/50 focus:border-[#fff5d7] focus:outline-none"
                                name="customUnit"
                                value={formData.customUnit}
                                onChange={handleChange}
                            />
                        )}
                    </div>

                </div>

                <div className="mt-10">
                    <button
                        type="submit"
                        className="bg-[#fff5d7] text-[#24421E] py-3 px-8 rounded-full md:text-lg border-2 border-[#fff5d7] hover:text-[#fff5d7] hover:bg-[#24421E] hover:font-medium"
                    >
                        Finish
                    </button>
                </div>

            </form>

        </div>
    )
}

export default OnboardingStep2