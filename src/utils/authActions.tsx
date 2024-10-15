"use server";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export const logout = async () => {
  await signOut()
};

export const loginWithCredentials = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    await signIn("credentials", { email, password, redirectTo: "/" });
    return {
      message: "Invalid credentials",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials",
          };
        default: {
          return {
            error: "Incorrect Email or Password",
          };
        }
      }
    }
    throw error;
  }
};

export const loginWithGoogle = async () => {
  await signIn("google", { redirectTo: "/" });
};

export const loginWithGithub = async () => {
  await signIn("github", { redirectTo: "/" });
};
