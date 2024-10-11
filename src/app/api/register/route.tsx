import { NextResponse } from "next/server";
import User from "@/models/userModel";
import connectDB from "@/lib/database";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import genrateOTP from "@/utils/genrateOTP";
import { verifyMail } from "@/utils/verifyMail";
import UserOTP from "@/models/userOTP";

export async function POST(req: Request) {
  try {
    await connectDB();

    const registerData = await req.json();
    console.log(registerData);

    const { name, email, password, repassword } = registerData;

    const isEmailTaken: any = await User.findOne({ email });
    if (isEmailTaken) {
      return NextResponse.json(
        { message: "Email is already taken" },
        { status: 400 }
      );
    }

    if (name.length < 4) {
      return NextResponse.json(
        { message: "First and last name should be at least 4 characters long" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password should have at least 6 characters" },
        { status: 400 }
      );
    }
    if (password !== repassword) {
      return NextResponse.json(
        { message: "Password should have at least 6 characters" },
        { status: 400 }
      );
    }

    const salt = 10;
    const hash = await bcrypt.hash(password, salt);
    const uniqueId = uuidv4();
    const genrateOtp = genrateOTP();
    let subject = "Your OTP Code for email verification - Links Nest";

    verifyMail(email, subject, genrateOtp);

    const otpModelObject: {
      otp: string;
      email: string;
      userModel: {
        name: string;
        email: string;
        password: string;
        userID: string;
      };
      generatedTime: number;
    } = {
      otp: genrateOtp,
      email,
      userModel: {
        name,
        email,
        password: hash,
        userID: uniqueId,
      },
      generatedTime: Date.now(),
    };

    const isOTPcreated = await UserOTP.findOne({
      email: otpModelObject.userModel.email,
    });
    if (isOTPcreated) {
      const OTPsend = await UserOTP.updateOne({ email: email }, otpModelObject);

      if (!OTPsend) {
        return NextResponse.json(
          { message: "unable to create OTP" },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { message: "OTP create successfully", isOTPcreated },
        { status: 200 }
      );
    } else {
      const OTPsend = await UserOTP.create(otpModelObject);
      if (!OTPsend) {
        return NextResponse.json(
          { message: "unable to create OTP" },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { message: "OTP create successfully", otpModelObject },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error registering user", error: (error as Error).message },
      { status: 500 }
    );
  }
}
