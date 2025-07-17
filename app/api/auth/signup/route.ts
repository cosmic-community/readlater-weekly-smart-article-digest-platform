import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUserByEmail, createUserSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { 
      fullName, 
      email, 
      password, 
      digestDay, 
      digestTime, 
      timezone, 
      emailNotifications, 
      subscriptionTier 
    } = await request.json();

    // Validate input
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: 'Full name, email, and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create user
    const user = await createUser({
      fullName,
      email,
      password,
      digestDay: digestDay || 'Friday',
      digestTime: digestTime || '17:00',
      timezone: timezone || 'Eastern (EST)',
      emailNotifications: emailNotifications ?? true,
      subscriptionTier: subscriptionTier || 'Free'
    });

    // Create session
    await createUserSession(user.id);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.metadata.email,
        fullName: user.metadata.full_name,
        subscriptionTier: user.metadata.subscription_tier
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}