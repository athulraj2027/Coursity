import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { sendReceipt } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    courseId,
    userId,
    amount,
  } = await req.json();

  // Verify signature
  const generated_signature = crypto
    .createHmac("sha256", process.env.RZP_SECRET!)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    return NextResponse.json({
      success: false,
      error: "Payment verification failed",
    });
  }

  try {
    // Get student profile (with email if needed)
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId },
      include: { user: true }, // ensure you can access user.email
    });

    if (!studentProfile) {
      return NextResponse.json(
        { success: false, error: "Student profile not found" },
        { status: 400 }
      );
    }

    // Create enrollment
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: studentProfile.id,
        courseId,
        enrolledAt: new Date(),
      },
      include: {
        student: { include: { user: true } },
        course: { include: { teacher: { include: { user: true } } } },
      },
    });

    // Extract required fields
    const studentEmail = enrollment.student.user.email;
    const courseName = enrollment.course.name;

    // Send receipt email
    await sendReceipt(studentEmail, courseName, amount);

    // TODO: send notification to teacher as well
    // const teacherEmail = enrollment.course.teacher.user.email;
    // await sendNotificationToTeacher(teacherEmail, studentProfile.user.name, courseName);

    return NextResponse.json({ enrollment, success: true });
  } catch (error) {
    console.error("Error in verifying payment : ", error);
    return NextResponse.json(
      { success: false, error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
