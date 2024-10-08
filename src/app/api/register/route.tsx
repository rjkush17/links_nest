import { NextResponse } from 'next/server';
import User from '@/models/userModel';
import connectDB from '@/lib/database';

// Handle POST requests for user registration
export async function POST(req: Request) {
  try {
    // Connect to the database
    await connectDB();

    // Parse the incoming JSON data from the request body
    const registerData = await req.json();

    // Create a new user with the received data
    const user = await User.create(registerData);

    // Return a success response with the created user data
    return NextResponse.json({
      message: 'User registration is successful',
      user,
    });

  } catch (error) {
    // Return an error response in case something goes wrong
    return NextResponse.json(
      { message: 'Error registering user', error: (error as Error).message },
      { status: 500 } // Set appropriate HTTP status code for errors
    );
  }
}
