import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // adjust path to your prisma client
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

// POST /api/lecture
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { courseId, title, startTime, endTime } = body;

    if (!courseId || !title || !startTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 400 });

    const { payload } = await jwtVerify(token, secret);
    console.log(payload);

    const userId = payload.id as string;
    const role = payload.role as string;

    if (role !== "TEACHER")
      return NextResponse.json({ error: "Unauthorized role" }, { status: 400 });

    const teacherProfile = await prisma.teacherProfile.findUnique({
      where: { userId },
    });

    if (!teacherProfile)
      return NextResponse.json({ error: "Profile not found" }, { status: 400 });

    const meetingId = uuidv4();

    const lecture = await prisma.lecture.create({
      data: {
        courseId,
        title,
        startTime: new Date(startTime),
        endTime: endTime ? new Date(endTime) : null,
        meetingId,
      },
    });

    return NextResponse.json({ lecture }, { status: 201 });
  } catch (error) {
    console.error("Error creating lecture:", error);
    return NextResponse.json(
      { error: "Failed to create lecture" },
      { status: 500 }
    );
  }
}
