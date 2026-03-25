'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from "./Input"

const ForgotPasswordForm = () => {
    const router = useRouter()

    const [formData, setFormData] = useState({
        email: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.error || "Something went wrong")
                return
            }

            router.push("/forgot-password/success")

        } catch (error) {
            console.error(error)
            alert("Something went wrong")
        }
    }

    return (
        <div className="text-[#24421E]">

            <form onSubmit={handleSubmit}>

                <div className="bg-[#fff5d7] py-6 px-8 rounded-4xl border-4 border-blue-50">

                    <div className="flex flex-col gap-2 mb-4">

                        <Input
                            label="Email"
                            width="w-full"
                            placeholder="Enter email address"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                        />

                    </div>
                </div>

                <div className="mt-6 md:mt-10 flex items-center justify-center">
                    <button type='submit' className="font-inter  gap-2 bg-[#fff5d7] text-[#24421E] py-3 px-8 rounded-full md:text-lg border-2 border-[#fff5d7] hover:text-[#fff5d7] hover:bg-[#24421E] hover:font-medium">
                        Get Reset Link
                    </button>
                </div>

            </form>
        </div>
    )
}

export default ForgotPasswordForm