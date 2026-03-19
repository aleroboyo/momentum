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
                            label="Username"
                            width="w-full"
                            placeholder="Username"
                        />

                        <PasswordVisibility
                            placeholder='Enter password'
                            width="w-full"
                        />

                    </div>

                    <div className="font-medium flex justify-end">
                        <Link href="/reset-password">
                            Forgot Password?
                        </Link>
                    </div>
                </div>

                <div className="mt-6 md:mt-10 flex items-center justify-center">
                    <Link href="/signup">
                        <button className="font-inter  gap-2 bg-[#fff5d7] text-[#24421E] py-3 px-8 rounded-full md:text-lg border-2 border-[#fff5d7] hover:text-[#fff5d7] hover:bg-[#24421E] hover:font-medium">
                            Login
                        </button>
                    </Link>
                </div>

            </form>
        </div>
    )
}

export default LoginForm
