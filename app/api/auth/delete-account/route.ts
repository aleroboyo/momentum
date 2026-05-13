import { NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import Habit from '@/models/Habit'
import Log from '@/models/Log'
import { getSession, deleteSession } from '@/lib/session'

export async function DELETE() {
  try {
    await dbConnect()

    const userId = await getSession()
    if (!userId) {
      return NextResponse.json(
        { error: 'You must be logged in' },
        { status: 401 }
      )
    }

    await Log.deleteMany({ userId })

    await Habit.deleteMany({ userId })

    await User.findByIdAndDelete(userId)

    await deleteSession()

    return NextResponse.json({ success: true, message: 'Account deleted successfully' })

  } catch (error) {
    console.error('❌ Delete account error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}