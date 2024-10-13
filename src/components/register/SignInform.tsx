"use client";
import * as React from "react";
import { validateEmail } from "@/utils/validateEmail";
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
import usePOST from "@/hooks/usePOST";
import toast, { Toaster } from "react-hot-toast";

interface SignInformProps {
  handleData: (para: any) => void;
  resendData: (para: any) => void; // Add this line
}
export default function SignInform({
  handleData, resendData
}: SignInformProps) {
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [repassword, setRePassword] = React.useState<string>("");
  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const [error, setError] = React.useState<any>(null);

  const { isError, isLoading, data, fetchPOST } = usePOST();

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();

    setError({});
    let hasError = false;
    if (!isChecked) {
      setError((prev: any) => ({
        ...prev,
        InputCheckedError:
          "You've to Agree with the Term & Conditions for SignIn",
      }));
      hasError = true;
    }
    if (name.length < 4) {
      setError((prev: any) => ({
        ...prev,
        InputNameError: "Name should have at least 4 letters",
      }));
      hasError = true;
      setName("");
    }
    if (!email) {
      setError((prev: any) => ({
        ...prev,
        InputEmailError: "Please Enter the email address",
      }));
      hasError = true;
      setEmail("");
    }
    if (!validateEmail(email)) {
      setError((prev: any) => ({
        ...prev,
        InputEmailError: "Invalid email format",
      }));
      hasError = true;
      setEmail("");
    }
    if (password.length < 6) {
      setError((prev: any) => ({
        ...prev,
        InputPasswordError: "Password should have at least 4 letters",
      }));
      hasError = true;
      setPassword("");
    }
    if (password !== repassword) {
      setError((prev: any) => ({
        ...prev,
        InputRePasswordError: "Passwords do not match",
      }));
      hasError = true;
      setRePassword("");
      setPassword("");
    }
    if (!hasError) {
      const FormData: any = { name, email, password, repassword };
      await fetchPOST("register", FormData); 
      resendData?.(FormData) 
    }
  };

  React.useEffect(()=>{
    if (isError && isError.message) {
      toast.error(isError.message);
    }
    if (data && data.message) {
      handleData?.(data.response);
     
    }
  },[data,isError])

  return (
    <main className="flex justify-center items-center w-full h-screen">
      <Toaster />
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle className="text-3xl">Create an Account</CardTitle>
          <CardDescription>
            Already have an account ?{" "}
            <span className="font-semibold text-black underline">Login</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="w-11/12 mx-auto">
          <form onSubmit={handleForm}>
            <div className="grid w-full items-center gap-4">
              {/* Input for name */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Write your fullname"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
                {error && error.InputNameError && (
                  <p className="ml-2 font-semibold text-xs text-red-500">
                    {error.InputNameError}
                  </p>
                )}
              </div>

              {/* input for email */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Write your email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
                {error && error.InputEmailError && (
                  <p className="ml-2 font-semibold text-xs text-red-500">
                    {error.InputEmailError}
                  </p>
                )}
              </div>

              {/* input for password */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="passowrd">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="type password"
                  value={password}
                  autoComplete="New password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
                {error && error.InputPasswordError && (
                  <p className="ml-2 font-semibold text-xs text-red-500">
                    {error.InputPasswordError}
                  </p>
                )}
              </div>

              {/* input for re passowrd */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="re_password">Confirm Password</Label>
                <Input
                  id="re_password"
                  type="password"
                  placeholder="Re-type password"
                  value={repassword}
                  autoComplete="New password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setRePassword(e.target.value)
                  }
                />
                {error && error.InputRePasswordError && (
                  <p className="ml-2 font-semibold text-xs text-red-500">
                    {error.InputRePasswordError}
                  </p>
                )}
              </div>
              <div className="items-top flex space-x-2">
                <Checkbox
                  id="terms1"
                  name="term"
                  onClick={() => setIsChecked(!isChecked)}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none text-muted-foreground"
                  >
                    I agree with the{" "}
                    <span className="underline font-semibold text-black">
                      Terms & Conditions
                    </span>
                  </label>
                  {error && error.InputCheckedError && (
                    <p className="font-semibold text-xs text-red-500">
                      {error.InputCheckedError}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {isLoading ? (
              <Button className="w-full py-4 mt-4" disabled>Processing...</Button>
            ) : (
              <Button className="w-full py-4 mt-4" type="submit">
                Create Account
              </Button>
            )}
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
