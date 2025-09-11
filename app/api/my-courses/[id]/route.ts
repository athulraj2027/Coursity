import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
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
      include: {
        courses: {
          where: { id },
          include: { lectures: true },
        },
      },
    });

    if (!teacherProfile)
      return NextResponse.json({ error: "Profile not found" }, { status: 400 });

    return NextResponse.json(
      { course: teacherProfile.courses },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
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
      include: {
        courses: {
          where: { id },
        },
      },
    });

    if (!teacherProfile)
      return NextResponse.json({ error: "Profile not found" }, { status: 400 });

    if (teacherProfile.courses.length === 0) {
      return NextResponse.json(
        { error: "Course not found or does not belong to you" },
        { status: 403 }
      );
    }

    // Delete the course
    await prisma.course.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete course" },
      { status: 500 }
    );
  }
}
