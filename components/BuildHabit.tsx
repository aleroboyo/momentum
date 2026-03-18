'use client'

import Link from "next/link"

const BuildHabit = () => {
  return (
    <div
      className="h-screen flex flex-col items-center justify-center font-medium md:text-lg bg-cover bg-right bg-no-repeat md:bg-center"
      style={{ backgroundImage: "url('/Ascending Steps.jpeg')" }}
    >

      <div className="w-full h-full bg-black/40 flex flex-col items-center justify-center gap-8">

        <div className="text-center text-white max-w-xl flex flex-col items-center gap-4">
          <h2 className="text-3xl md:text-5xl font-bold">Build Better Habits</h2>
          <p className="mt-2 md:text-2xl">Small steps every day lead to real progress.</p>
        </div>

        <Link href='/how-it-works'>
          <button className="font-inter flex items-center gap-2 bg-[#fff5d7] text-[#24421E] py-2 px-6 mt-10 md:mt-0 rounded-full md:text-lg shadow-lg hover:shadow-xl">
            Continue
          </button>
        </Link>

      </div>
    </div>
  )
}

export default BuildHabit
