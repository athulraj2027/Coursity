import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const enrollment = await prisma.enrollment.findUnique({
      where: { id },
      include: {
        course: {
          include: {
            teacher: true, // fetch the teacher of the course
            lectures: true,
          },
        },
        student: true,
      },
    });

    if (!enrollment)
      return NextResponse.json(
        { error: "Enrollment not func" },
        { status: 400 }
      );

    return NextResponse.json({ enrollment });
  } catch (error) {
    console.log("Error in fetching learnings : ", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
