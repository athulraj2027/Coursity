import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RZP_KEY_ID as string,
  key_secret: process.env.RZP_SECRET as string,
});

export async function POST(req: NextRequest) {
  const { amount, currency, receipt } = await req.json();
  try {
    const options = {
      amount: amount * 100,
      currency: currency || "INR",
      receipt: receipt || `rcpt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.log("Error in creating order : ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
