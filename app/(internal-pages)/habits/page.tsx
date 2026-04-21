import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/session'
import dbConnect from '@/lib/db'
import Habit from '@/models/Habit'
import { iconMap } from '@/lib/icons'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Momentum | My Habits'
}

export default async function Habits() {
  const userId = await getSession()
  if (!userId) redirect('/login')

  await dbConnect()

  const habits = await Habit.find({ userId }).sort({ createdAt: -1 })

  return (
    <div className="min-h-screen p-6 md:p-10 font-inter text-[#24421E]">

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-medium">My Habits</h1>
          <p className="text-sm text-[#24421E]/60 mt-1">
            {habits.length === 0
              ? 'No habits yet'
              : `${habits.length} habit${habits.length > 1 ? 's' : ''} total`
            }
          </p>
        </div>
        <Link
          href="/habits/create-habit"
          className="bg-[#24421E] text-[#fff5d7] py-2 px-6 rounded-full text-sm font-medium border-2 border-[#24421E] hover:bg-transparent hover:text-[#24421E] transition-all"
        >
          + New Habit
        </Link>
      </div>

      {habits.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 gap-4 text-center">
          <p className="text-xl font-medium">No habits yet</p>
          <p className="text-[#24421E]/60">Start building your first habit today</p>
          <Link
            href="/habits/create-habit"
            className="mt-4 bg-[#24421E] text-[#fff5d7] py-3 px-8 rounded-full border-2 border-[#24421E] hover:bg-transparent hover:text-[#24421E] transition-all"
          >
            Create Habit
          </Link>
        </div>

      ) : (
        <>
        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {habits.map((habit) => (
              <Link
                key={habit._id.toString()}
                href={`/habits/${habit._id.toString()}`}
                className="group"
              >
                
                <div className="bg-white rounded-3xl p-5 border border-[#24421E]/10 group-hover:border-[#24421E]/30 group-hover:shadow-sm transition-all flex flex-row gap-4">

                  <div className="bg-[#24421E]/10 text-[#24421E] p-3 rounded-full h-fit shrink-0">
                    {iconMap[habit.icon]}
                  </div>

                  <div className="flex flex-col justify-center">
                    <h2 className="font-medium text-base">{habit.name}</h2>
                    <p className="text-xs text-[#24421E]/60 mt-1 capitalize">
                      {habit.frequency}
                    </p>
                    <p className="text-xs text-[#24421E]/60">
                      Target: {habit.target} {habit.unit}
                    </p>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        </>
      )}

    </div>
  )
}