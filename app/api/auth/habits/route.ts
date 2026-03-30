import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Habit from '@/models/Habit'
import { getSession } from '@/lib/session'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const userId = await getSession()

    if (!userId) {
      return NextResponse.json(
        { error: 'You must be logged in to create a habit' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, icon, frequency, target, unit } = body

    if (!name?.trim()) {
      return NextResponse.json(
        { error: 'Habit name is required' },
        { status: 400 }
      )
    }
    if (!icon) {
      return NextResponse.json(
        { error: 'Please select an icon' },
        { status: 400 }
      )
    }
    if (!frequency) {
      return NextResponse.json(
        { error: 'Please select a frequency' },
        { status: 400 }
      )
    }
    if (!target || isNaN(Number(target)) || Number(target) <= 0) {
      return NextResponse.json(
        { error: 'Please enter a valid target' },
        { status: 400 }
      )
    }
    if (!unit?.trim()) {
      return NextResponse.json(
        { error: 'Please select a unit' },
        { status: 400 }
      )
    }

    const habit = await Habit.create({
      userId,           
      name: name.trim(),
      icon,
      frequency,
      target: Number(target),  
      unit: unit.trim(),
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Habit created successfully',
        habit: {
          id: habit._id.toString(),
          name: habit.name,
          icon: habit.icon,
          frequency: habit.frequency,
          target: habit.target,
          unit: habit.unit,
        }
      },
      { status: 201 }  
    )

  } catch (error) {
    console.error('❌ Create habit error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await dbConnect()

    const userId = await getSession()

    if (!userId) {
      return NextResponse.json(
        { error: 'You must be logged in' },
        { status: 401 }
      )
    }

    const habits = await Habit.find({ userId }).sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      habits
    })

  } catch (error) {
    console.error('❌ Get habits error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
