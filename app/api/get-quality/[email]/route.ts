import connectDB from "@/lib/dbConnect";
import { Quality } from "@/lib/models/qualityModel";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const user = await currentUser();

  if (!user) throw new Error("Unauthorized");

  const userEmail = user.emailAddresses[0]?.emailAddress;

  await connectDB();

  try {
    if (!userEmail) {
      return new NextResponse("User email not found", { status: 400 });
    }

    const qualities = await Quality.find({ userEmail });

    return NextResponse.json(qualities);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
