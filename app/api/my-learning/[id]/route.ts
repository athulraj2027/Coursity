import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    return;
  } catch (error) {
    console.log("Error in fetching learnings : ", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
