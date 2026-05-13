import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db'
import User from '@/models/User'
import { getSession } from '@/lib/session'

export async function PATCH(request: NextRequest) {
  try {
    await dbConnect()

    const userId = await getSession()
    if (!userId) {
      return NextResponse.json(
        { error: 'You must be logged in' },
        { status: 401 }
      )
    }

    const { fullName, username } = await request.json()

    if (!fullName?.trim()) {
      return NextResponse.json(
        { error: 'Full name is required' },
        { status: 400 }
      )
    }

    if (!username?.trim()) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      )
    }

    const existingUser = await User.findOne({
      username: username.toLowerCase().trim(),
      _id: { $ne: userId } 
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username already taken' },
        { status: 400 }
      )
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        fullName: fullName.trim(),
        username: username.toLowerCase().trim(),
      },
      { new: true }
    ).select('fullName username email')

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user
    })

  } catch (error) {
    console.error('❌ Update profile error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}