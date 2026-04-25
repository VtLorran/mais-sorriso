import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

const adminRoutes = ["/", "/patients", "/agenda", "/prontuario"];
const publicRoutes = ["/login", "/signup"];

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Allow public pages and auth API routes
  const isPublicRoute = publicRoutes.includes(path);
  const isAuthApi = path.startsWith("/api/auth");
  
  if (isPublicRoute || isAuthApi) {
    return NextResponse.next();
  }

  const isAdminRoute = adminRoutes.includes(path) || 
                       path.startsWith("/api/patients") || 
                       path.startsWith("/api/appointments") || 
                       path.startsWith("/api/dashboard") ||
                       path.startsWith("/api/dental-records");

  const cookie = request.cookies.get("session")?.value;
  let session = null;
  try {
    session = cookie ? await decrypt(cookie) : null;
  } catch (e) {
    session = null;
  }

  // Redirect to login if not authenticated and trying to access private route
  if (!session && path !== "/welcome") {
    if (path.startsWith("/api/")) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role based access
  if (session && isAdminRoute && session.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/welcome", request.url));
  }

  // Redirect to dashboard if logged in and trying to access login/signup
  if (session && isPublicRoute) {
    if (session.role === "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.redirect(new URL("/welcome", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
