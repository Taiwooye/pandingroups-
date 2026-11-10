import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Matches the flag in ComingSoonOverlay.tsx — flip both together when launching.
const COMING_SOON = true;

export function middleware(request: NextRequest) {
  if (COMING_SOON && request.nextUrl.pathname.startsWith("/book")) {
    // Block the booking page server-side so bots can't reach the form at all.
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/book", "/book/:path*"],
};
