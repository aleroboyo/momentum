import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

interface SignupData {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body: SignupData = await request.json();
    const { fullName, username, email, password } = body;

    if (!fullName?.trim() || !username?.trim() || !email?.trim() || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const existingUserByUsername = await User.findOne({
      username: username.toLowerCase().trim()
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        { error: 'Username already taken' },
        { status: 400 }
      );
    }

    const existingUserByEmail = await User.findOne({
      email: email.toLowerCase().trim()
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      fullName: fullName.trim(),
      username: username.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    const baseUrl = new URL(request.url).origin;

    try {
      const sendWelcomeEmail = await fetch(`${baseUrl}/api/auth/welcome-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newUser.email,
          username: newUser.username,
          fullName: newUser.fullName,
        }),
      });

      if (!sendWelcomeEmail.ok) {
        const errorData = await sendWelcomeEmail.json();
        console.error('❌ Email failed:', errorData);
      }

    } catch (emailError) {
      console.error('❌ Email request failed:', emailError);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        user: {
          id: newUser._id.toString(),
          fullName: newUser.fullName,
          username: newUser.username,
          email: newUser.email,
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('❌ Signup error:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
