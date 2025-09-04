import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { otp, email } = await req.json();
    console.log("hi");
    if (!otp || !email)
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    const record = await prisma.otp.findFirst({
      where: { email, code: otp },
      orderBy: { createdAt: "desc" },
    });

    if (!record) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    if (record.expiresAt < new Date()) {
      await prisma.otp.delete({ where: { id: record.id } });
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    if (record.code !== otp)
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });

    await prisma.otp.delete({ where: { id: record.id } });

    return NextResponse.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.log("error in verifying otp : ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
