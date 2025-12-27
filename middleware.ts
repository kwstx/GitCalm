import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    // Basic Rate Limit Headers (Informational Only without Redis)
    const response = NextResponse.next();

    // Security Headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    // 1. Validates JWT automatically via 'auth' wrapper
    // 2. Protects sensitive routes
    const isAuthRoute = req.nextUrl.pathname.startsWith('/dashboard') || req.nextUrl.pathname.startsWith('/onboarding');
    const isLoggedIn = !!req.auth;

    if (isAuthRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return response;
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
