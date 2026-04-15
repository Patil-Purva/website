import { NextResponse } from "next/server";

export function proxy(request) {
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    const { pathname } = request.nextUrl;

    // 🔐 Protect USER routes
    if (
        pathname.startsWith("/book-appointment") ||
        pathname.startsWith("/my-appointments")
    ) {
        if (!accessToken && !refreshToken) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // 🔐 Protect DOCTOR routes
    if (pathname.startsWith("/doctor")) {
        if (!accessToken && !refreshToken) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/book-appointment",
        "/my-appointments",
        "/doctor/:path*",
    ],
};