import connectDB from "@/lib/dbConnect";
import { Quality } from "@/lib/models/qualityModel";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await connectDB();

  try {
    const id = request.url.split("/")[request.url.split("/").length - 1];
    let quality = await request.json();

    const updatedQuality = await Quality.findByIdAndUpdate(id, quality);

    if (!updatedQuality) {
      return new NextResponse("Quality not found", { status: 404 });
    }

    return new NextResponse("Quality updated successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
