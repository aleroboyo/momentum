'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Input from "./Input"
import PasswordVisibility from "./PasswordVisibility"
import Link from "next/link"

const LoginForm = () => {
    const router = useRouter()

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.error);
            return;
        }

        router.push("/dashboard");
    }

    return (
        <div className="text-[#24421E]">

            <form onSubmit={handleSubmit}>

                <div className="bg-[#fff5d7] py-6 px-8 rounded-4xl border-4 border-blue-50">

                    <div className="flex flex-col gap-2 mb-4">

                        <Input
                            label="Username or email address"
                            width="w-full"
                            placeholder="Enter username or email address"
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

                    <div className="font-medium flex justify-end">
                        <Link href="/forgot-password">
                            Forgot Password?
                        </Link>
                    </div>
                </div>

                <div className="mt-6 md:mt-10 flex items-center justify-center">
                        <button type="submit" className="font-inter  gap-2 bg-[#fff5d7] text-[#24421E] py-3 px-8 rounded-full md:text-lg border-2 border-[#fff5d7] hover:text-[#fff5d7] hover:bg-[#24421E] hover:font-medium">
                            Login
                        </button>
                </div>

            </form>
        </div>
    )
}

export default LoginForm
