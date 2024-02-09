import connectDB from "@/lib/dbConnect";
import { Quality } from "@/lib/models/qualityModel";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const user = await currentUser();
  
    if (!user) throw new Error("Unauthorized");
    
    const userEmail = user.emailAddresses[0].emailAddress;

    await connectDB();
  
    try {
      let quality = await request.json();

      quality = { ...quality, userEmail };
      
      // Create a new instance of the Quality model with the provided data
      const result = new Quality(quality);
  
      // Save the quality instance
      await result.save();
  
      return NextResponse.json({ isSuccess: true, message: "Quality added successfully" });
    } catch (error) {
      console.log(error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }
  