import { NextResponse } from "next/server";
import User from "@/models/userModel";
import connectDB from "@/lib/database";
import bcrypt from "bcryptjs";
import genrateOTP from "@/utils/genrateOTP";
import { verifyMail } from "@/utils/verifyMail";
import forgotPasswordOTP from "@/models/forgotpasswordOTP";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password, re_password } = await req.json();

    const isEmailRegistered: any = await User.findOne({ email });
    if (!isEmailRegistered) {
      return NextResponse.json(
        { message: "this email is not registered" },
        { status: 400 }
      );
    }

    const isOAuthUser = !isEmailRegistered.password;

    let hash: string | null = null;
    const salt = 10;

    if (!isOAuthUser) {
      if (!isOAuthUser && password.length < 6) {
        return NextResponse.json(
          { message: "Password should have at least 6 characters" },
          { status: 400 }
        );
      }
      if (!isOAuthUser && password !== re_password) {
        return NextResponse.json(
          { message: "Password not match with the confirm password" },
          { status: 400 }
        );
      }

      hash = await bcrypt.hash(password, salt);

      const isPasswordSame = await bcrypt.compare(
        password,
        isEmailRegistered.password
      );

      if (isPasswordSame) {
        return NextResponse.json(
          { message: "Password must be different than the last one." },
          { status: 400 }
        );
      }
    } else {
      hash = await bcrypt.hash(password, salt);
      if (!hash) {
        return NextResponse.json(
          { message: "Error while Hashing Password" },
          { status: 400 }
        );
      }
    }

    const genrateOtp = genrateOTP();
    const OTPgeneratedTime = Date.now();
    let subject = "Your OTP Code for password Reset  - Links Nest";
    verifyMail(email, subject, genrateOtp);

    const otpModelObject: {
      otp: string;
      email: string;
      password: string;
      generatedTime: number;
    } = {
      otp: genrateOtp,
      email,
      password: hash,
      generatedTime: OTPgeneratedTime,
    };

    const response: {
      email: string;
      genratedTime: number;
    } = {
      email,
      genratedTime: OTPgeneratedTime,
    };

    const isOTPcreated = await forgotPasswordOTP.findOne({
      email: otpModelObject.email,
    });
    if (isOTPcreated) {
      const OTPsend = await forgotPasswordOTP.updateOne(
        { email: email },
        otpModelObject
      );

      if (!OTPsend) {
        return NextResponse.json(
          { message: "unable to create OTP" },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { message: "OTP create successfully", response },
        { status: 200 }
      );
    } else {
      const OTPsend = await forgotPasswordOTP.create(otpModelObject);
      if (!OTPsend) {
        return NextResponse.json(
          { message: "unable to create OTP" },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { message: "OTP create successfully", response },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server Error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
