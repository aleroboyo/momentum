'use client'

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import PasswordVisibility from "./PasswordVisibility"

const ResetPasswordForm = () => {
    const router = useRouter()

    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
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

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match")
            return
        }

        if (formData.password.length < 8) {
            alert("Password must be at least 8 characters")
            return
        }

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    token,
                    password: formData.password,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.error || "Something went wrong")
                return
            }

            router.push("/reset-password/success")

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

                        <PasswordVisibility
                            label="New Password"
                            placeholder='Enter new password'
                            width="w-full"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <PasswordVisibility
                            label="Re-enter Password"
                            placeholder='Re-enter new password'
                            width="w-full"
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />

                    </div>
                </div>

                <div className="mt-6 md:mt-10 flex items-center justify-center">
                    <button type="submit" className="font-inter  gap-2 bg-[#fff5d7] text-[#24421E] py-3 px-8 rounded-full md:text-lg border-2 border-[#fff5d7] hover:text-[#fff5d7] hover:bg-[#24421E] hover:font-medium">
                        Reset Password
                    </button>
                </div>

            </form>
        </div>
    )
}

export default ResetPasswordForm
