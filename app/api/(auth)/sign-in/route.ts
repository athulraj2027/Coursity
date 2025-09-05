import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { email, password, role } = await req.json();
    if (!email || !password || !role)
      return NextResponse.json(
        { error: "Credentials missing" },
        { status: 400 }
      );
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email not registered" },
        { status: 400 }
      );
    }

    if (role.toUpperCase() !== user.role)
      return NextResponse.json(
        { error: "Invalid role given" },
        { status: 400 }
      );

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return NextResponse.json(
        { error: "Invalid password or email address" },
        { status: 400 }
      );

    // create cookie

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    if (!token)
      return NextResponse.json(
        { error: "Failed to create token" },
        { status: 400 }
      );
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return NextResponse.json({
      message: "User logged in",
      user,
      token,
      success: true,
    });
  } catch (error) {
    console.log("error in signing in user : ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
