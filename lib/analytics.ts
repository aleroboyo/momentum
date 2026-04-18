import Log from '@/models/Log'
import Habit from '@/models/Habit'

export async function getStreak(habitId: string, target: number) {
  const logs = await Log.find({ habitId }).sort({ date: -1 })

  if (logs.length === 0) return 0

  let streak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const checkDate = new Date(today)

  for (const log of logs) {
    const logDate = new Date(log.date)
    logDate.setHours(0, 0, 0, 0)

    if (logDate.getTime() === checkDate.getTime()) {

      if (log.value >= target) {
        streak++
        checkDate.setDate(checkDate.getDate() - 1)
      } else {
        break
      }
    } else {
      break
    }
  }

  return streak
}

export async function getLongestStreak(habitId: string, target: number) {
  const logs = await Log.find({ habitId }).sort({ date: 1 }) // oldest first

  if (logs.length === 0) return 0

  let longest = 0
  let current = 0
  let prevDate: Date | null = null

  for (const log of logs) {
    const logDate = new Date(log.date)
    logDate.setHours(0, 0, 0, 0)

    const hitTarget = log.value >= target

    if (!hitTarget) {
      current = 0
      prevDate = null
      continue
    }

    if (!prevDate) {
      current = 1
    } else {
      const expectedDate = new Date(prevDate)
      expectedDate.setDate(expectedDate.getDate() + 1)

      if (logDate.getTime() === expectedDate.getTime()) {
        current++
      } else {
        current = 1
      }
    }

    prevDate = logDate
    if (current > longest) longest = current
  }

  return longest
}

export async function getTodayProgress(habitId: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const log = await Log.findOne({
    habitId,
    date: { $gte: today, $lt: tomorrow }
  })

  return log ? log.value : 0
}

export async function getWeeklyCompletion(habitId: string, target: number) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const startOfWeek = new Date(today)
  const day = today.getDay()
  const diff = day === 0 ? 6 : day - 1 
  startOfWeek.setDate(today.getDate() - diff)

  const logs = await Log.find({
    habitId,
    date: { $gte: startOfWeek }
  })

  const completedDays = logs.filter(log => log.value >= target).length

  const daysPassed = diff + 1

  return Math.round((completedDays / daysPassed) * 100)
}

export async function getWeeklyTotal(habitId: string) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const startOfWeek = new Date(today)
  const day = today.getDay()
  const diff = day === 0 ? 6 : day - 1
  startOfWeek.setDate(today.getDate() - diff)

  const logs = await Log.find({
    habitId,
    date: { $gte: startOfWeek }
  })

  return logs.reduce((sum, log) => sum + log.value, 0)
}

export async function getDashboardStats(userId: string) {
  const habits = await Habit.find({ userId })

  if (habits.length === 0) {
    return {
      totalHabits: 0,
      bestStreak: 0,
      weeklyCompletion: 0,
      todayProgress: 0,
    }
  }

  const statsPerHabit = await Promise.all(
    habits.map(async (habit) => {
      const [streak, todayValue, weeklyCompletion] = await Promise.all([
        getStreak(habit._id.toString(), habit.target),
        getTodayProgress(habit._id.toString()),
        getWeeklyCompletion(habit._id.toString(), habit.target),
      ])
      return { streak, todayValue, weeklyCompletion, target: habit.target }
    })
  )

  const bestStreak = Math.max(...statsPerHabit.map(s => s.streak))

  const weeklyCompletion = Math.round(
    statsPerHabit.reduce((sum, s) => sum + s.weeklyCompletion, 0) / habits.length
  )

  const completedToday = statsPerHabit.filter(
    s => s.todayValue >= s.target
  ).length

  const todayProgress = Math.round((completedToday / habits.length) * 100)

  return {
    totalHabits: habits.length,
    bestStreak,
    weeklyCompletion,
    todayProgress,
  }
}