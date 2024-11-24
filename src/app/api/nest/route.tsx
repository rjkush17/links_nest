import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import { v4 as uuidv4 } from "uuid";
import Nest from "@/models/nestModel";
import { auth } from "@/auth"

export async function POST(req: Request) {
  const session = await auth()
  if (!session){
    return NextResponse.json(
      { message: "unauthroized request " },
      { status: 500 }
    );
  }
  try {
    await connectDB();
    const { userID } = await req.json();

    if (!userID || typeof userID !== "string") {
      return NextResponse.json(
        { message: "Invalid userID provided" },
        { status: 400 }
      );
    }

    const id = uuidv4();
    const nestData = {
      nestID: id,
      userID: userID,
    };

    const allNest = await Nest.find({ userID: userID });
    if (!allNest) {
      return NextResponse.json(
        { message: "error while checking nests" },
        { status: 500 }
      );
    }

    if (allNest.length >= 3) {
      return NextResponse.json(
        { message: "you already create your all 3 nest" },
        { status: 500 }
      );
    }

    const nest = await Nest.create(nestData);
    if (!nest) {
      return NextResponse.json(
        { message: "Nest not Created" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Nest created successfully",
      response: nest,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}

