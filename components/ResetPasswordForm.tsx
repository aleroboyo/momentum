'use client'

import PasswordVisibility from "./PasswordVisibility"
import Link from "next/link"

const ResetPasswordForm = () => {
    return (
        <div className="text-[#24421E]">

            <form>

                <div className="bg-[#fff5d7] py-6 px-8 rounded-4xl border-4 border-blue-50">

                    <div className="flex flex-col gap-2 mb-4">

                        <PasswordVisibility
                            label="New Password"
                            placeholder='Enter new password'
                            width="w-full"
                        />

                         <PasswordVisibility
                            label="Re-enter Password"
                            placeholder='Re-enter new password'
                            width="w-full"
                        />

                    </div>
                </div>

                <div className="mt-6 md:mt-10 flex items-center justify-center">
                    <Link href="/reset-password/success">
                        <button className="font-inter  gap-2 bg-[#fff5d7] text-[#24421E] py-3 px-8 rounded-full md:text-lg border-2 border-[#fff5d7] hover:text-[#fff5d7] hover:bg-[#24421E] hover:font-medium">
                            Reset Password
                        </button>
                    </Link>
                </div>




            </form>
        </div>
    )
}

export default ResetPasswordForm
