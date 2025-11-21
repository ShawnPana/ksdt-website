import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isRouteDisabled } from './lib/navigation';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the route is disabled
  if (isRouteDisabled(pathname)) {
    // Redirect to home page
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Allow the request to continue
  return NextResponse.next();
}

// Configure which routes this middleware should run on
export const config = {
  // Match all routes except:
  // - API routes (/api/*)
  // - Static files (/_next/static/*)
  // - Image optimization (/_next/image/*)
  // - Favicon and other static assets
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};