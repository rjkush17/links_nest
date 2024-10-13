import NextAuth from "next-auth";
import Googleprovider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/database";
import User from "@/models/userModel"
import bcrypt from "bcryptjs";

// import passwordCompare from "./utils/passwordCompare";


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Googleprovider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async ({email, password}) => {

        if (typeof password !== "string" || typeof email !== "string") {
          throw new Error("Password and Email must be a string");
        }
        await connectDB();
        // logic to salt and hash passw 
        // logic to verify if the user exists
        const user:any = await User.findOne({email});
        if(!user){
          throw new Error("Incorrect Email or Password")
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
          throw new Error("Incorrect Email or Password")
        }

        // delete user.password
        // delete user.updatedAt
        // delete user.createdAt

        console.log(user)

        return user
      },
    }),
  ],
});
