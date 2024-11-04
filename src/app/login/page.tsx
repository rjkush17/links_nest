"use client";
import * as React from "react";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import {loginWithGoogle ,loginWithGithub, loginWithCredentials} from "@/utils/authActions"
import Link from "next/link";
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

function page() {

  const router = useRouter()
  const { data: session } = useSession()

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<Boolean>(false);
  const [error, setError] = React.useState<string>("");

  React.useEffect(()=>{
    if (session?.user) {
        toast("You are already logged in, redirecting to home...", {
          icon: '❌',
        });
      router.push("/")
    }
  }, [session, router]);



  const submitHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await loginWithCredentials( email, password );
      if (result?.message) {
        toast.success(result.message);
      }
      if (result?.error) {
        toast.error(result.error);
        setError(result.error);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>; // You can show a loading spinner here if you prefer
  }

  return (
    <main className="flex justify-center items-center w-full h-screen">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle className="text-3xl">Welcome back!</CardTitle>
          <CardDescription>
            Not have account ? Create a account{" "}
            <Link href="/register">
            <span className="font-semibold text-black underline">HERE</span>
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent className="w-11/12 mx-auto">
          <form onSubmit={submitHandler}>
            <div className="grid w-full items-center gap-4">
              {/* input for email */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Write your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              {/* input for password */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="passowrd">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="type password"
                  value={password}
                  autoComplete="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && (
              <p className="ml-2 font-semibold text-xs text-red-500">{error}</p>
            )}

            {loading ? (
              <Button className="w-full py-4 my-4" disabled>
                loging...
              </Button>
            ) : (
              <Button className="w-full py-4 my-4" type="submit">
                Login
              </Button>
            )}
              <CardDescription>
            Forgot Password ? You can reset the password{" "}
            <Link href="/forgot-password">
            <span className="font-semibold text-black underline">HERE</span>
            </Link>
          </CardDescription>
          </form>
          <div className="relative flex justify-center items-center my-4">
            <Separator className="w-full" />
            <span className="absolute text-sm bg-white px-4 font-semibold">
              OR CONTINUE WITH
            </span>
          </div>
          <div className="flex gap-3">
            <Button className="w-full text-lg font-normal" onClick={()=>loginWithGoogle()}>
              {" "}
              <span className="text-2xl mx-2">
                <FaGoogle />
              </span>{" "}
              Google
            </Button>
            <Button className="w-full text-lg font-normal" onClick={()=>loginWithGithub()}>
              {" "}
              <span className="text-2xl mx-2">
                <FaGithub />
              </span>{" "}
              Github
            </Button>{" "}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

export default page;
