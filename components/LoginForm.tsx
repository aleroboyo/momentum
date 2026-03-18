'use client'

import Input from "./Input"
import PasswordVisibility from "./PasswordVisibility"
import Link from "next/link"

const LoginForm = () => {
    return (
        <div className="text-[#24421E]">

            <form>

                <div className="bg-[#fff5d7] py-6 px-8 rounded-4xl border-4 border-blue-50">

                    <div className="flex flex-col gap-2 mb-4">

                        <Input
                            label="Name"
                            width="w-full"
                            placeholder="Full Name"
                        />

                        <Input
                            label="Email"
                            width="w-full"
                            placeholder="Email"
                        />

                        <Input
                            label="Username"
                            width="w-full"
                            placeholder="Username"
                        />

                        <PasswordVisibility
                            placeholder='Enter password'
                            width="w-full"
                        />

                    </div>
                </div>

                <div className="mt-6 flex items-center justify-center">
                    <Link href="/signup">
                        <button className="font-inter  gap-2 bg-[#fff5d7] text-[#24421E] py-3 px-8 rounded-full md:text-lg shadow-lg hover:shadow-xl">
                            Log In
                        </button>
                    </Link>
                </div>

            </form>
        </div>
    )
}

export default LoginForm
