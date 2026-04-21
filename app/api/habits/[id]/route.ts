import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import Habit from '@/models/Habit'
import Log from '@/models/Log'
import { getSession } from '@/lib/session'

export async function PATCH(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect()

        const { id } = await props.params
        const userId = await getSession()
        if (!userId) {
            return NextResponse.json(
                { error: 'You must be logged in' },
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

        const habit = await Habit.findOneAndUpdate(
            { _id: id, userId },
            {
                name: name.trim(),
                icon,
                frequency,
                target: Number(target),
                unit,
            },
            { returnDocument: 'after' }
        )

        if (!habit) {
            return NextResponse.json(
                { error: 'Habit not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            message: 'Habit updated successfully',
            habit
        })

    } catch (error) {
        console.error('❌ Update habit error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect()

    const { id } = await props.params
    const userId = await getSession()

    if (!userId) {
      return NextResponse.json(
        { error: 'You must be logged in' },
        { status: 401 }
      )
    }

    const habit = await Habit.findOneAndDelete({ _id: id, userId })

    if (!habit) {
      return NextResponse.json(
        { error: 'Habit not found' },
        { status: 404 }
      )
    }

    await Log.deleteMany({ habitId: id })

    return NextResponse.json({
      success: true,
      message: 'Habit deleted successfully'
    })

  } catch (error) {
    console.error('❌ Delete habit error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}