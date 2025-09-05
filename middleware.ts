import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const { pathname } = req.nextUrl;
  const publicRoutes = ["/sign-in", "/sign-up", "/"];
  console.log("token : ", token);

  if (!token) {
    if (publicRoutes.some((route) => pathname === route)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  try {
    const { payload } = await jwtVerify(token, secret);
    if (
      pathname === "/sign-in" ||
      pathname === "/sign-up" ||
      pathname === "/"
    ) {
      let redirectPath = "/";
      if (payload.role === "ADMIN") redirectPath = "/admin";
      if (payload.role === "TEACHER") redirectPath = "/teacher";
      if (payload.role === "STUDENT") redirectPath = "/student";

      return NextResponse.redirect(new URL(redirectPath, req.url));
    }

    if (pathname.startsWith("/admin") && payload.role !== "ADMIN")
      return NextResponse.redirect(new URL("/", req.url));

    if (pathname.startsWith("/teacher") && payload.role !== "TEACHER")
      return NextResponse.redirect(new URL("/", req.url));

    if (pathname.startsWith("/student") && payload.role !== "STUDENT")
      return NextResponse.redirect(new URL("/", req.url));

    return NextResponse.next();
  } catch (error) {
    console.error("JWT verification failed:", error);

    const res = NextResponse.redirect(new URL("/sign-in", req.url));
    res.cookies.set("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: -1, // expire immediately
    });
    return res;
  }
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
