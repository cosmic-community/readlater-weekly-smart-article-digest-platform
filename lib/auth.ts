import { cookies } from 'next/headers';
import { createBucketClient } from '@cosmicjs/sdk';
import { User } from '@/types';

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

export async function hashPassword(password: string): Promise<string> {
  // Simple hash function - in production, use bcrypt or similar
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const hashedPassword = await hashPassword(password);
  return hashedPassword === hash;
}

export async function createUserSession(userId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('user-session', userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/'
  });
}

export async function getUserSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get('user-session');
  return session?.value || null;
}

export async function destroyUserSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('user-session');
}

export async function getCurrentUser(): Promise<User | null> {
  const userId = await getUserSession();
  if (!userId) return null;

  try {
    const response = await cosmic.objects.findOne({
      id: userId
    }).depth(1);
    
    return response.object as User;
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const response = await cosmic.objects.find({
      type: 'users',
      'metadata.email': email
    }).depth(1);
    
    return response.objects[0] as User || null;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    return null;
  }
}

export async function createUser(userData: {
  fullName: string;
  email: string;
  password: string;
  digestDay: string;
  digestTime: string;
  timezone: string;
  emailNotifications: boolean;
  subscriptionTier: string;
}): Promise<User> {
  const hashedPassword = await hashPassword(userData.password);
  
  try {
    const response = await cosmic.objects.insertOne({
      type: 'users',
      title: userData.fullName,
      metadata: {
        email: userData.email,
        password: hashedPassword,
        full_name: userData.fullName,
        subscription_tier: userData.subscriptionTier,
        digest_day: userData.digestDay,
        digest_time: userData.digestTime,
        timezone: userData.timezone,
        email_notifications: userData.emailNotifications,
        account_status: 'Active'
      }
    });
    
    return response.object as User;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = await getUserByEmail(email);
  if (!user) return null;

  const isValid = await verifyPassword(password, user.metadata.password);
  if (!isValid) return null;

  return user;
}