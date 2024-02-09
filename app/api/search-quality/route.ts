import connectDB from "@/lib/dbConnect";
import { Quality } from "@/lib/models/qualityModel";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user) throw new Error("Unauthorized");

  const userEmail = user.emailAddresses[0]?.emailAddress;

  await connectDB();

  try {
    if (!userEmail) {
      return new NextResponse("User email not found", { status: 400 });
    }

    const { qualityName } = await request.json();

    if (!qualityName) {
      return new NextResponse("Quality name not provided", { status: 400 });
    }

    const qualities = await Quality.find({
      userEmail,
      qualityName: { $regex: qualityName, $options: "i" }, // Case-insensitive search
    });

    return NextResponse.json(qualities);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
