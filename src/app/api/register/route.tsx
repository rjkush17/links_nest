import { NextResponse } from "next/server";
import User from "@/models/userModel";
import connectDB from "@/lib/database";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    await connectDB();

    const registerData = await req.json();
    console.log(registerData);

    const { name, email, password, repassword } = registerData;

    const isEmailTaken: any =await  User.findOne({ email });
    if (isEmailTaken) {
      return NextResponse.json(
        { message: "Email is already taken" },
        { status: 400 }
      );
    }

    if (name.length< 4) {
      return NextResponse.json({ message: "First and last name should be at least 4 characters long" }, { status: 400 });
    }
    
    if (password.length < 6) {
      return NextResponse.json({ message: "Password should have at least 6 characters" }, { status: 400 });
    }
    if (password !== repassword ) {
      return NextResponse.json({ message: "Password should have at least 6 characters" }, { status: 400 });
    }
   
    const salt = 10;
    const hash = await bcrypt.hash(password, salt);
    const uniqueId = uuidv4();
    
    const user = await User.create({name,email,password : hash, userID : uniqueId});
    if (!user) {
      return NextResponse.json({ message: "user not created" }, { status: 400 });
    }

    return NextResponse.json({
      message: "User registration is successful",
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error registering user", error: (error as Error).message },
      { status: 500 }
    );
  }
}
