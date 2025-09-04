import { sendOtpEmail } from "@/lib/mailer";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await prisma.otp.deleteMany({ where: { email } });
    await prisma.otp.create({
      data: { email, code: otp, expiresAt },
    });

    await sendOtpEmail(email, otp);

    return NextResponse.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error generating OTP:", error);
    return NextResponse.json(
      { error: "Failed to generate OTP" },
      { status: 500 }
    );
  }
}
