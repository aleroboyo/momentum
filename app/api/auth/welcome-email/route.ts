import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

interface EmailData {
  email: string;
  username: string;
  fullName: string;
}

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body: EmailData = await request.json();
    const { email, username, fullName } = body;

    if (!email || !username || !fullName) {
      return NextResponse.json(
        { error: 'Missing email, username, or fullName' }, 
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: 'momentum@resend.dev',  
      to: email,
      subject: `Welcome ${fullName}!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333;">Hello ${fullName}!</h1>
          <h3>Welcome to our Momentum 🎉</h3>
          <p>Your account has been created successfully.</p>
          <p>Your username is ${username}!
          <p>Start exploring now!</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            This is an automated welcome email.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Email error:', errorMessage);
    
    return NextResponse.json(
      { error: 'Failed to send welcome email' }, 
      { status: 500 }
    );
  }
}
