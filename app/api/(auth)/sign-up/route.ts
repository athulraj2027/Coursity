import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password, role } = await req.json();
    if (!username || !email || !password || !role)
      return NextResponse.json(
        { error: "Credentials missing" },
        { status: 400 }
      );
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: role.toUpperCase(),
      },
    });

    return NextResponse.json({ message: "User created", user: newUser });
  } catch (error) {
    console.log("error in signing up user : ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
