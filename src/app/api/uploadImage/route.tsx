import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import Nest from "@/models/nestModel"
import { auth } from "@/auth"

export async function POST(req: Request) {
  try {
    await connectDB()
    const session = await auth()
 const formData = await req.formData();
    const file = formData.get("file");
    const userID = formData.get("user");
    const nestID = formData.get("nest");
  

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!file || !nestID || !userID) {
      return NextResponse.json({ message: "Require data not found" }, { status: 400 })
    }

    const isSameUser = String(userID) === String(session?.user?.userID);

    if(!isSameUser){
      return NextResponse.json({ message: "user ID not match with current User" }, { status: 400 })
    }


    console.log("nestID-------", nestID)

    const nest = await Nest.findOne({ nestID:nestID })
    if (nest) {
      return NextResponse.json({ message: "Nest ID not found" }, { status: 400 })
    }

    if (nest.links) {
      return NextResponse.json({ message: "image already present" }, { status: 400 })
    }

  } catch (error) {
    console.log("error message ---", error)
    return NextResponse.json(
      { message: "Internal Server error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
