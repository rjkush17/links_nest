import { NextResponse } from "next/server";
import User from "@/models/userModel";
import connectDB from "@/lib/database";
import UserOTP from "@/models/userOTP";

export async function POST(req: Request) {
  try {
    await connectDB();
    const responseData = await req.json();
    const { email, userID, otp } = responseData;

    const alreadyPresent = await User.findOne({email})
    if(alreadyPresent){
      return NextResponse.json(
        { message: "User already exits" },
        { status: 400 }
      );
    }

    const stillExisted: any = await UserOTP.findOne({ email });

    if (!stillExisted) {
      return NextResponse.json(
        { message: "OTP expire or Server Error" },
        { status: 400 }
      );
    }

    const currentTime = Date.now();
    const otpGeneratedTime = stillExisted.generatedTime;
    const fiveMinutesInMs = 5 * 60 * 1000;

    if (otpGeneratedTime + fiveMinutesInMs < currentTime) {
      return NextResponse.json({ message: "OTP expired" }, { status: 400 });
    }

    if (otp === stillExisted.otp) {
      const newUser = await User.create(stillExisted.userModel);
      return NextResponse.json({
        message: "Verification complete",
        userDetail: newUser,
      },{status:200});
    } else {
      return NextResponse.json({ message: "Incorrect OTP" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error Verifying user", error: (error as Error).message },
      { status: 500 }
    );
  }
}
