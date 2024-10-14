"use client"
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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import toast, { Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'
import { handlers } from "@/auth";

function page() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loading, setLoading] = React.useState<Boolean>(false);
  const [error, setError] = React.useState<string>("");

  const router = useRouter()


  const submitHandler = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setError("");


    try {
      "user server"
      const data = await signIn("credentials", {
        email,
        password,
        redirectTo: "/"
      });
      console.log(data)

      if (data && data.error) {
        setError(data.error);
        toast.error(data.error)
      } else {
        toast.success('Successfully logged in!')
        router.push('/')
      }
    } catch (error) {
      toast.error("Login failed. Please try again.")
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center w-full h-screen">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle className="text-3xl">Welcome back!</CardTitle>
          <CardDescription>
            Not have account ? Create a account{" "}
            <span className="font-semibold text-black underline">HERE</span>
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
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox id="terms1" name="term" />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none text-muted-foreground"
                  >
                    Remember me
                  </label>
                </div>
              </div>
            </div>

            {loading ?  <Button className="w-full py-4 mt-4" disabled>
              loging...
            </Button> :
             <Button className="w-full py-4 mt-4" type="submit">
             Login
           </Button>
             }

           
          </form>
          <div className="relative flex justify-center items-center my-4">
            <Separator className="w-full" />
            <span className="absolute text-sm bg-white px-4 font-semibold">
              OR CONTINUE WITH
            </span>
          </div>
          <div className="flex gap-3">
            <Button className="w-full text-lg font-normal">
              {" "}
              <span className="text-2xl mx-2">
                <FaGoogle />
              </span>{" "}
              Google
            </Button>
            <Button className="w-full text-lg font-normal">
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
