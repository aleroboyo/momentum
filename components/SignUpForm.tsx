'use client'

import { useState } from "react"
import Input from "./Input"
import PasswordVisibility from "./PasswordVisibility"
import { useRouter } from "next/navigation"

const SignUpForm = () => {
    const router = useRouter()
    
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        username: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                router.push("/onboarding");
            }

            if (!res.ok) {
                alert(data.error || "Something went wrong")
                return
            }

            alert("Account created successfully 🎉")

        } catch (error) {
            console.error(error);
            alert("Something went wrong")
        }
    }

    return (
        <div className="text-[#24421E]">

            <form onSubmit={handleSubmit}>

                <div className="bg-[#fff5d7] py-6 px-8 rounded-4xl border-4 border-blue-50">

                    <div className="flex flex-col gap-2 mb-4">

                        <Input
                            label="Name"
                            width="w-full"
                            placeholder="Full Name"
                            name='fullName'
                            value={formData.fullName}
                            onChange={handleChange}
                        />

                        <Input
                            label="Email"
                            width="w-full"
                            placeholder="Email"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <Input
                            label="Username"
                            width="w-full"
                            placeholder="Username"
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                        />

                        <PasswordVisibility
                            label="Password"
                            placeholder='Enter password'
                            width="w-full"
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                        />

                    </div>
                </div>

                <div className="mt-6 md:mt-10 flex items-center justify-center">
                    <button type="submit" className="font-inter  gap-2 bg-[#fff5d7] text-[#24421E] py-3 px-8 rounded-full md:text-lg border-2 border-[#fff5d7] hover:text-[#fff5d7] hover:bg-[#24421E] hover:font-medium">
                        Sign Up
                    </button>
                </div>

            </form>
        </div>
    )
}

export default SignUpForm
