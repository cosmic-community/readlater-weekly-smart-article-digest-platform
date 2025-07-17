import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

export function middleware(request: NextRequest) {
  const userSession = request.cookies.get('user-session');
  const { pathname } = request.nextUrl;

  // Define protected routes
  const protectedRoutes = ['/dashboard', '/articles', '/pricing'];
  const authRoutes = ['/auth/login', '/auth/signup'];

  // Check if user is trying to access protected routes
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Check if user is trying to access auth routes
  const isAuthRoute = authRoutes.some(route => 
    pathname.startsWith(route)
  );

  // If user is not logged in and trying to access protected route
  if (isProtectedRoute && !userSession) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If user is logged in and trying to access auth routes
  if (isAuthRoute && userSession) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/articles/:path*',
    '/pricing/:path*',
    '/auth/login',
    '/auth/signup'
  ]
};