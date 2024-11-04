"use server";
import { auth } from "../auth";

async function useAuth() {
  const session = await auth();

  if (!session?.user) return null;

  return session;
}

export default useAuth;