import NextAuth from "next-auth";
import Googleprovider from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/database";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Googleprovider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async ({ email, password }) => {
        if (typeof password !== "string" || typeof email !== "string") {
          throw new Error("Password and Email must be a string");
        }
        await connectDB();
        // logic to salt and hash passw
        // logic to verify if the user exists
        const user: any = await User.findOne({ email });
        if (!user) {
          throw new Error("Incorrect Email or Password");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("Incorrect Email or Password");
        }
        delete user.password;
        delete user.updatedAt;
        delete user.createdAt;

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        await connectDB();
        const loginBefore: any = await User.findOne({ email: user?.email });

        if (loginBefore) {
          return true;
        }

        const uniqueId = uuidv4();

        if (
          !user?.name ||
          !user?.email ||
          !account?.provider ||
          !account?.providerAccountId
        ) {
          throw new Error("Missing required user or account information.");
        }

        const userModel: {
          name: string;
          email: string;
          userID: string;
          providerName: string;
          providerID: string;
        } = {
          name: user?.name,
          email: user?.email,
          userID: uniqueId,
          providerName: account?.provider,
          providerID: account?.providerAccountId,
        };

        const userCreated = await User.create(userModel); // Ensure async with await
        if (!userCreated) {
          throw new Error("User not created");
        }

        return true;
      } catch (error) {
        console.error("signIn callback failure:", error);
        return false;
      }
    },
    async jwt({ user, token }) {

      if(user){
        console.log(user)
      }
      // await connectDB();

      // try {
      //   const findUser: any = await User.findOne({ email: user?.email });
      //   if (!findUser) {
      //     throw new Error("user email not find in DB");
      //   }

      //   token.userID = findUser?.userID;
      //   token.name = findUser?.name;
      //   token.email = findUser?.email;
      // } catch (error) {
      //   console.log("fail to modify the token", error);
      // }
      return token;
    },

    // async session({ session, token }) {
    //   // Ensure token properties exist and are of type string before assigning them to session
    //   if (typeof token.email === 'string' && typeof token.name === 'string' && typeof token.userID === 'string') {
    //     session.user.email = token.email;
    //     session.user.name = token.name;
    //     session.user.id = token.userID;
    //   } else {
    //     throw new Error("Missing or invalid token information in session callback.");
    //   }

    //   return session;
    // },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
