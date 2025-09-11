import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        teacher: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!course)
      return NextResponse.json({ error: "Course not found" }, { status: 400 });

    return NextResponse.json(course);
  } catch (error) {
    console.log("server error in fetchign course : ", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
