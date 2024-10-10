import { NextResponse } from "next/server";
import User from "@/models/userModel";
import connectDB from "@/lib/database";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import genrateOTP from "@/utils/genrateOTP";
import { verifyMail } from "@/utils/verifyMail";

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

    const userModel: {
      name: string;
      email: string;
      password: string;
      userID: string;
    } = { name, email, password: hash, userID: uniqueId };


const otp = genrateOTP();
let subject = "Your OTP Code for email verification - Links Nest"

verifyMail(email, subject, otp)



// 5- it return thr function where email, uuiD genrate and share to use

// 6- then user take that and req for virify email he send uuid and email with otp

// 7- verify opt take the opt and verift the email and uuit if not valid then return not "not opt req found"

// 7 - if found thne create the user 

// Resend OPT code 

// 1- create a button that send another request for the registration model if the another OPT model exit it delete the old one

  } catch (error) {
    return NextResponse.json(
      { message: "Error registering user", error: (error as Error).message },
      { status: 500 }
    );
  }
}
