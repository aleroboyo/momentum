import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Log from '@/models/Log'
import Habit from '@/models/Habit'
import { getSession } from '@/lib/session'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const userId = await getSession()
    if (!userId) {
      return NextResponse.json(
        { error: 'You must be logged in' },
        { status: 401 }
      )
    }

    const { habitId, value } = await request.json()

    if (!habitId) {
      return NextResponse.json(
        { error: 'Habit ID is required' },
        { status: 400 }
      )
    }

    if (!value || isNaN(Number(value)) || Number(value) <= 0) {
      return NextResponse.json(
        { error: 'Please enter a valid value' },
        { status: 400 }
      )
    }

    const habit = await Habit.findOne({ _id: habitId, userId })
    if (!habit) {
      return NextResponse.json(
        { error: 'Habit not found' },
        { status: 404 }
      )
    }

    // Strip time so it's just the date — prevents double logging same day
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const existingLog = await Log.findOne({ habitId, date: today })
    if (existingLog) {
      return NextResponse.json(
        { error: 'Already logged for today' },
        { status: 400 }
      )
    }

    const log = await Log.create({
      habitId,
      userId,
      value: Number(value),
      date: today,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Habit logged successfully',
        log: {
          id: log._id.toString(),
          value: log.value,
          date: log.date,
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('❌ Log habit error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect()

    const userId = await getSession()
    if (!userId) {
      return NextResponse.json(
        { error: 'You must be logged in' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const habitId = searchParams.get('habitId')

    if (!habitId) {
      return NextResponse.json(
        { error: 'Habit ID is required' },
        { status: 400 }
      )
    }

    const habit = await Habit.findOne({ _id: habitId, userId })
    if (!habit) {
      return NextResponse.json(
        { error: 'Habit not found' },
        { status: 404 }
      )
    }

    const logs = await Log.find({ habitId }).sort({ date: -1 })

    return NextResponse.json({
      success: true,
      logs
    })

  } catch (error) {
    console.error('❌ Get logs error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}