import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 465,
  secure: true, // true for port 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOtpEmail(to: string, otp: string) {
  const mailOptions = {
    from: `"Coursity" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}`,
    html: `<h2>Verify your email</h2><p>Your OTP is <b>${otp}</b></p>`,
  };

  await transporter.sendMail(mailOptions);
}

export async function sendReceipt(
  studentEmail: string,
  courseName: string,
  amount: number
) {
  const mailOptions = {
    from: `"Coursity" <${process.env.EMAIL_USER}>`,
    to: studentEmail,
    subject: "Payment Receipt",
    text: `You have successfully enrolled in ${courseName}. Amount: ₹${amount}`,
  };

  await transporter.sendMail(mailOptions);
}
