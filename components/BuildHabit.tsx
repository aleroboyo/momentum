'use client'

import Link from "next/link"

const BuildHabit = () => {
  return (
   <div
  className="h-screen bg-cover bg-right bg-no-repeat md:bg-center relative flex flex-col items-center justify-center font-medium md:text-lg"
  style={{ backgroundImage: "url('/Ascending Steps.jpeg')" }}
>
  <div className="absolute inset-0 bg-black/40" />

  <div className="relative z-10 text-white text-center px-6 flex-1 flex flex-col justify-center">
    <div>
      <h2 className="text-3xl md:text-5xl font-bold">Build Better Habits</h2>
      <p className="mt-2 md:text-2xl">Small steps every day lead to real progress.</p>
    </div>

    <Link href='/how-it-works'>
      <button className="absolute bottom-24 right-33 md:right-50 md:bottom-36 lg:hidden font-inter flex items-center gap-2 bg-[#ffefbf] text-[#24421E] py-2 px-4 rounded-full md:text-lg">
        Continue
      </button>
    </Link>
  </div>
</div>
   
  )
}

export default BuildHabit
