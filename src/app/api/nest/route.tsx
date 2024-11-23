import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import { v4 as uuidv4 } from "uuid";
import Nest from "@/models/nestModel";

export async function POST(req: Request) {
  try {
    connectDB();
    const { userID } = await req.json();
    console.log(userID)

    const nestData = {
      nestID: uuidv4(),
      userID: userID,
    };

    const nest = await Nest.create(nestData);
    if (!nest) {
      return NextResponse.json(
        { message: "Nest not Created" },
        { status: 400 }
      );
    }

    return NextResponse.json({message: "Nest created successfully", response : nest})
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}

// user ID and Emails ID aayegi client side se for create Nest