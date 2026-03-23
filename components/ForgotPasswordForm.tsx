'use client'

import Input from "./Input"
import Link from "next/link"

const ForgotPasswordForm = () => {
    return (
        <div className="text-[#24421E]">

            <form>

                <div className="bg-[#fff5d7] py-6 px-8 rounded-4xl border-4 border-blue-50">

                    <div className="flex flex-col gap-2 mb-4">

                        <Input
                            label="Email"
                            width="w-full"
                            placeholder="Enter email address"
                        />

                    </div>
                </div>

                <div className="mt-6 md:mt-10 flex items-center justify-center">
                    <Link href="/forgot-password/success">
                        <button className="font-inter  gap-2 bg-[#fff5d7] text-[#24421E] py-3 px-8 rounded-full md:text-lg border-2 border-[#fff5d7] hover:text-[#fff5d7] hover:bg-[#24421E] hover:font-medium">
                            Get Reset Link
                        </button>
                    </Link>
                </div>

            </form>
        </div>
    )
}

export default ForgotPasswordForm