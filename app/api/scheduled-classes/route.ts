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

    if (role !== "TEACHER")
      return NextResponse.json({ error: "Unauthorized role" }, { status: 400 });

    const lectures = await prisma.lecture.findMany({
      where: {
        course: {
          teacher: {
            userId, // only fetch lectures from this teacher’s courses
          },
        },
      },
      include: {
        course: true, // include course details
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return NextResponse.json({ lectures });
  } catch (error) {
    console.log("Error fetching lectures : ", error);
    return NextResponse.json(
      { error: "Error fetching lectures" },
      { status: 500 }
    );
  }
}
