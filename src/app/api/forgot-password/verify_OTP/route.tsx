import { NextResponse } from "next/server";
import User from "@/models/userModel";
import connectDB from "@/lib/database";
import UserOTP from "@/models/userOTP";
import forgotPasswordOTP from "@/models/forgotpasswordOTP";

export async function POST(req: Request) {
  try {
    await connectDB();
    const responseData = await req.json();
    const { email, otp } = responseData;


    const stillExisted: any = await forgotPasswordOTP.findOne({ email });

    if (!stillExisted){
      return NextResponse.json(
        { message: "OTP expire" },
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
      const updateModel = await User.findOneAndUpdate({email},{password : stillExisted.password},{ new: true });

      if (!updateModel){
        return NextResponse.json(
          { message: "Failed To update the password" },
          { status: 400 }
        );
      }

      await forgotPasswordOTP.deleteOne({ email });

    
      return NextResponse.json({
        message: "Password updated successfully" 
      },{status:200});
    } else {
      return NextResponse.json({ message: "Incorrect OTP", isVerified: true }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "internal Server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
