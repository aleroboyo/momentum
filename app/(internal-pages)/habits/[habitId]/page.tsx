import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import dbConnect from '@/lib/db'
import Habit from '@/models/Habit'
import Log from '@/models/Log'
import mongoose from 'mongoose' // ✅ added
import { iconMap } from '@/lib/icons'
import {
  getStreak,
  getLongestStreak,
  getWeeklyCompletion,
  getWeeklyTotal,
  getTodayProgress
} from '@/lib/analytics'
import LogButton from '@/components/LogButton'
import HabitActions from '@/components/HabitActions'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Momentum | Habit'
}

export default async function HabitPage(props: {
  params: Promise<{ habitId: string }>
}) {
  const { habitId } = await props.params
  const userId = await getSession()
  if (!userId) redirect('/login')

  await dbConnect()

  // ✅ FIX: ensure ObjectId
  const habitObjectId = new mongoose.Types.ObjectId(habitId)

  const habit = await Habit.findOne({
  _id: habitObjectId,
  userId: new mongoose.Types.ObjectId(userId)
})

  // ✅ TEMP DEBUG (instead of silent redirect)
  if (!habit) {
    console.log('Habit not found:', habitId)
    return <div>Habit not found</div>
  }

  const [
    streak,
    longestStreak,
    weeklyCompletion,
    weeklyTotal,
    todayValue,
    logs,
  ] = await Promise.all([
    getStreak(habit._id.toString(), habit.target),
    getLongestStreak(habit._id.toString(), habit.target),
    getWeeklyCompletion(habit._id.toString(), habit.target),
    getWeeklyTotal(habit._id.toString()),
    getTodayProgress(habit._id.toString()),
    Log.find({ habitId: habit._id }) // ✅ uses ObjectId
      .sort({ date: -1 })
      .limit(30),
  ])

  const allLogs = await Log.find({ habitId: habit._id }) // ✅ same fix

  const average = allLogs.length > 0
    ? Math.round(allLogs.reduce((sum, log) => sum + log.value, 0) / allLogs.length)
    : 0

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const startOfThisWeek = new Date(today)
  const dayOfWeek = today.getDay()
  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  startOfThisWeek.setDate(today.getDate() - diffToMonday)

  const startOfLastWeek = new Date(startOfThisWeek)
  startOfLastWeek.setDate(startOfThisWeek.getDate() - 7)

  const lastWeekLogs = await Log.find({
    habitId: habit._id, // ✅ fix
    date: { $gte: startOfLastWeek, $lt: startOfThisWeek }
  })

  const lastWeekTotal = lastWeekLogs.reduce((sum, log) => sum + log.value, 0)

  const weeklyImprovement = lastWeekTotal === 0
    ? null
    : Math.round(((weeklyTotal - lastWeekTotal) / lastWeekTotal) * 100)

  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)

  const monthLogs = await Log.find({
    habitId: habit._id, // ✅ fix
    date: { $gte: startOfMonth }
  })

  const monthLogMap: Record<string, number> = {}

  monthLogs.forEach(log => {
    const dateKey = new Date(log.date).toISOString().split('T')[0]
    monthLogMap[dateKey] = log.value
  })

  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()

  const monthData = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(today.getFullYear(), today.getMonth(), i + 1)
    const dateKey = date.toISOString().split('T')[0]
    const value = monthLogMap[dateKey] || 0
    const hitTarget = value >= habit.target
    return { day: i + 1, value, hitTarget, isFuture: date > today }
  })

  return (
    <div className="min-h-screen p-6 md:p-10 font-inter text-[#24421E]">

      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-[#24421E]/10 text-[#24421E] p-4 rounded-full">
            {iconMap[habit.icon]}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-medium">{habit.name}</h1>
            <p className="text-sm text-[#24421E]/60 mt-1 capitalize">
              {habit.frequency} · Target: {habit.target} {habit.unit}
            </p>
          </div>
        </div>

        <HabitActions habitId={habit._id.toString()} habit={{
          name: habit.name,
          icon: habit.icon,
          frequency: habit.frequency,
          target: habit.target,
          unit: habit.unit,
        }} />
      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#24421E]/10 mb-6">
        <h2 className="font-medium mb-3">Log Today</h2>
        <LogButton
          habitId={habit._id.toString()}
          unit={habit.unit}
          target={habit.target}
          todayValue={todayValue}
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <div className="bg-white rounded-3xl p-5 border border-[#24421E]/10">
          <p className="text-sm text-[#24421E]/60 mb-2">Current Streak</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xl">🔥</span>
            <span className="text-3xl font-medium">{streak}</span>
            <span className="text-sm text-[#24421E]/60">days</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#24421E]/10">
          <p className="text-sm text-[#24421E]/60 mb-2">Longest Streak</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xl">🏆</span>
            <span className="text-3xl font-medium">{longestStreak}</span>
            <span className="text-sm text-[#24421E]/60">days</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#24421E]/10">
          <p className="text-sm text-[#24421E]/60 mb-2">Weekly Completion</p>
          <p className="text-3xl font-medium mt-2">{weeklyCompletion}%</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#24421E]/10">
          <p className="text-sm text-[#24421E]/60 mb-2">Avg per Session</p>
          <p className="text-3xl font-medium mt-2">
            {average}
            <span className="text-sm text-[#24421E]/60 ml-1">{habit.unit}</span>
          </p>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        <div className="bg-white rounded-3xl p-5 border border-[#24421E]/10">
          <p className="text-sm text-[#24421E]/60 mb-1">This Week</p>
          <p className="text-3xl font-medium">
            {weeklyTotal}
            <span className="text-sm text-[#24421E]/60 ml-1">{habit.unit}</span>
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#24421E]/10">
          <p className="text-sm text-[#24421E]/60 mb-1">Weekly Improvement</p>
          {weeklyImprovement === null ? (
            <p className="text-sm text-[#24421E]/60 mt-2">Not enough data yet</p>
          ) : (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-3xl font-medium">
                {weeklyImprovement > 0 ? '+' : ''}{weeklyImprovement}%
              </span>
              <span className="text-xl">
                {weeklyImprovement > 0 ? '📈' : weeklyImprovement < 0 ? '📉' : '➡️'}
              </span>
            </div>
          )}
        </div>

      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#24421E]/10 mb-6">
        <p className="text-sm text-[#24421E]/60 mb-4">
          Monthly Trend — {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
        </p>

        <div className="flex flex-wrap gap-2">
          {monthData.map(({ day, hitTarget, value, isFuture }) => (
            <div
              key={day}
              title={`Day ${day}: ${value} ${habit.unit}`}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                ${isFuture
                  ? 'bg-[#24421E]/5 text-[#24421E]/30'
                  : hitTarget
                    ? 'bg-[#24421E] text-[#fff5d7]'
                    : value > 0
                      ? 'bg-[#24421E]/30 text-[#24421E]'
                      : 'bg-[#24421E]/10 text-[#24421E]/40'
                }
              `}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-4 text-xs text-[#24421E]/60">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-[#24421E] inline-block" /> Target hit
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-[#24421E]/30 inline-block" /> Partial
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-[#24421E]/10 inline-block" /> Missed
          </span>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-[#24421E]/10">
        <p className="text-sm text-[#24421E]/60 mb-4">Recent Logs</p>
        {logs.length === 0 ? (
          <p className="text-sm text-[#24421E]/60">No logs yet — start logging to see your history!</p>
        ) : (
          <div className="flex flex-col gap-3">
            {logs.map((log) => (
              <div
                key={log._id.toString()}
                className="flex items-center justify-between py-2 border-b border-[#24421E]/10 last:border-0"
              >
                <span className="text-sm text-[#24421E]/60">
                  {new Date(log.date).toLocaleDateString('en-GB', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short'
                  })}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {log.value} {habit.unit}
                  </span>
                  {log.value >= habit.target && (
                    <span className="text-green-600 text-xs">✅</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
