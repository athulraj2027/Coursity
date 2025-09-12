import prisma from "@/lib/prisma";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });

    const { payload } = await jwtVerify(token, secret);
    console.log(payload);

    const userId = payload.id as string;
    const role = payload.role as string;

    if (role !== "STUDENT")
      return NextResponse.json({ error: "Unauthorized role" }, { status: 400 });

    const studentProfile = await prisma.studentProfile.findMany({
      where: { userId },
      include: {
        enrollments: {
          include: {
            course: {
              include: {
                teacher: true,
                lectures: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(studentProfile);
  } catch (error) {
    console.error("Error in fetching enrolled courses : ", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
