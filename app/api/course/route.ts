import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { name, description, price, startDate, noOfClasses, totalHours } = data;
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
    });

    if (!teacherProfile)
      return NextResponse.json({ error: "Profile not found" }, { status: 400 });

    const sameNameCourse = await prisma.course.findFirst({ where: { name } });
    if (sameNameCourse)
      return NextResponse.json(
        { error: "Course name is already used" },
        { status: 400 }
      );

    const newCourse = await prisma.course.create({
      data: {
        name,
        description,
        price: parseInt(price, 10),
        startDate: new Date(startDate),
        numberOfClasses: parseInt(noOfClasses, 10),
        totalHours: parseInt(totalHours, 10),
        teacherId: teacherProfile.id,
      },
    });
    return NextResponse.json({ success: true, course: newCourse });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}
