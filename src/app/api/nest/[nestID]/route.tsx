import { NextResponse } from "next/server";
import connectDB from "@/lib/database";
import Nest from "@/models/nestModel";

export async function GET(req : Request,{ params }: { params: { nestID: string } }) {
  try {
    await connectDB();
    const id = params.nestID;

    const nest = await Nest.findOne({ nestID: id });
    if(!nest){
      return NextResponse.json({
        message : "nest not found"
      },{status: 400})
    }

    return NextResponse.json({
      message: "Nest founded",
      response: nest,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}