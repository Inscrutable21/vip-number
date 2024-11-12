import { NextResponse } from 'next/server';

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Handle admin routes
  if (pathname.startsWith('/admin')) {
    // Skip middleware for API routes
    if (pathname.startsWith('/admin/api')) {
      return NextResponse.next();
    }

    const sessionCookie = request.cookies.get('admin_session');

    // For the login page (/admin)
    if (pathname === '/admin') {
      // If user is already logged in, redirect to dashboard
      if (sessionCookie?.value) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    }

    // For all other admin routes, check authentication
    if (!sessionCookie?.value) {
      // Redirect to login with return URL
      const returnUrl = encodeURIComponent(pathname);
      const redirectUrl = new URL(`/admin?returnUrl=${returnUrl}`, request.url);
      return NextResponse.redirect(redirectUrl, {
        status: 302 // Temporary redirect
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};