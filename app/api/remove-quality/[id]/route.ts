import connectDB from "@/lib/dbConnect";
import { Quality } from "@/lib/models/qualityModel";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  await connectDB();

  try {
    const id = request.url.split("/")[request.url.split("/").length - 1];

    const deletedQuality = await Quality.findByIdAndDelete(id);

    if (!deletedQuality) {
      return new NextResponse("Quality not found", { status: 404 });
    }

    return new NextResponse("Quality deleted successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
