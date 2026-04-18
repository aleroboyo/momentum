export const metadata = {
    title: "Momentum | Dashboard"
}

import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getSession } from '@/lib/session'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import Habit from '@/models/Habit'
import { getDashboardStats, getTodayProgress } from '@/lib/analytics'
import LogButton from '@/components/LogButton'
import { iconMap } from '@/lib/icons'

function getGreeting() {
  const hour = new Date().getHours()
  if (hour >= 0 && hour < 12) return 'Good Morning'
  if (hour >= 12 && hour < 17) return 'Good Afternoon'
  return 'Good Evening'
}

function getGreetingEmoji() {
  const hour = new Date().getHours()
  if (hour >= 0 && hour < 12) return '🌤️'
  if (hour >= 12 && hour < 17) return '☀️'
  return '🌙'
}

export default async function Dashboard() {
  const userId = await getSession()
  if (!userId) redirect('/login')

  await dbConnect()

  const [user, habits, stats] = await Promise.all([
    User.findById(userId).select('fullName'),
    Habit.find({ userId }).sort({ createdAt: -1 }),
    getDashboardStats(userId),
  ])

  if (!user) redirect('/login')

  const firstName = user.fullName.split(' ')[0]

  const habitsWithProgress = await Promise.all(
    habits.map(async (habit) => {
      const todayValue = await getTodayProgress(habit._id.toString())
      return { ...habit.toObject(), todayValue }
    })
  )

  return (
    <div className="min-h-screen p-6 md:p-10 font-inter text-[#24421E]">

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-medium">
          {getGreeting()}, {firstName} {getGreetingEmoji()}
        </h1>
        <p className="text-[#24421E]/60 mt-1 text-sm">
          {habits.length === 0
            ? "Let's build your first habit!"
            : `You have ${habits.length} habit${habits.length > 1 ? 's' : ''} to keep up with`
          }
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">

        <div className="bg-white rounded-3xl p-5 border border-[#24421E]/10">
          <p className="text-sm text-[#24421E]/60 mb-2">Today&apos;s Progress</p>
          <div className="flex items-center justify-center">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="30" fill="none" stroke="#24421E20" strokeWidth="10" />
              <circle
                cx="40" cy="40" r="30" fill="none"
                stroke="#24421E" strokeWidth="10"
                strokeDasharray={`${(stats.todayProgress / 100) * 188.5} 188.5`}
                strokeLinecap="round"
                transform="rotate(-90 40 40)"
              />
              <text x="40" y="45" textAnchor="middle" fontSize="16" fontWeight="600" fill="#24421E">
                {stats.todayProgress}%
              </text>
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#24421E]/10">
          <p className="text-sm text-[#24421E]/60 mb-2">Best Streak</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-2xl">🔥</span>
            <span className="text-3xl font-medium">{stats.bestStreak}</span>
            <span className="text-sm text-[#24421E]/60">days</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#24421E]/10">
          <p className="text-sm text-[#24421E]/60 mb-2">Weekly Completion</p>
          <p className="text-3xl font-medium mt-3">{stats.weeklyCompletion}%</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#24421E]/10">
          <p className="text-sm text-[#24421E]/60 mb-2">Total Habits</p>
          <p className="text-3xl font-medium mt-3">{stats.totalHabits}</p>
        </div>

      </div>

      {habitsWithProgress.length === 0 ? (

        <div className="flex flex-col items-center justify-center mt-20 gap-4 text-center">
          <p className="text-xl font-medium">No habits yet</p>
          <p className="text-[#24421E]/60">Create your first habit to get started</p>
          <Link
            href="/habits/create-habit"
            className="mt-4 bg-[#24421E] text-[#fff5d7] py-3 px-8 rounded-full border-2 border-[#24421E] hover:bg-transparent hover:text-[#24421E] transition-all"
          >
            Create Habit
          </Link>
        </div>

      ) : (

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">My Habits</h2>
            <Link
              href="/habits/create-habit"
              className="text-sm text-[#24421E]/60 hover:text-[#24421E] border-b border-[#24421E]/30"
            >
              + Add habit
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {habitsWithProgress.map((habit) => (
              <div
                key={habit._id.toString()}
                className="bg-white rounded-3xl p-6 border border-[#24421E]/10 hover:border-[#24421E]/30 hover:shadow-sm transition-all"
              >
                <Link href={`/habits/${habit._id.toString()}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-[#24421E]/10 text-[#24421E] p-3 rounded-full">
                      {iconMap[habit.icon]}
                    </div>
                    <div>
                      <h3 className="font-medium">{habit.name}</h3>
                      <p className="text-xs text-[#24421E]/60 capitalize">
                        {habit.frequency} · {habit.target} {habit.unit}
                      </p>
                    </div>
                  </div>
                </Link>

                <LogButton
                  habitId={habit._id.toString()}
                  unit={habit.unit}
                  target={habit.target}
                  todayValue={habit.todayValue}
                />

              </div>
            ))}
          </div>
        </div>

      )}

    </div>
  )
}
