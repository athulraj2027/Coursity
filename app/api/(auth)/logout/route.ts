import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.redirect(
    new URL(
      "/sign-in",
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    )
  );
  res.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: -1,
  });
  return res;
}
