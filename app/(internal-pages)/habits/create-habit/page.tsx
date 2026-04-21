'use client'

import CreateHabitForm from "@/components/CreateHabitForm"

const CreateHabit = () => {
  return (
    <div className="text-[#24421E] flex flex-col text-center md:mt-20 md:gap-16 font-inter font-medium">
                <h1 className="flex items-center justify-center text-2xl md:text-4xl mb-4">Create Habit</h1>
    
                <div className="">
                    <CreateHabitForm />
                </div>
    
            </div>
  )
}

export default CreateHabit
