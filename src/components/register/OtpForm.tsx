"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import usePOST from "@/hooks/usePOST";
import toast, { Toaster } from "react-hot-toast";

interface SignInformProps {
  userData?: any;
}

export default function OtpForm({ userData }: SignInformProps) {
  const [opt, setOpt] = React.useState<string>("");
  const [otpError, setOtpError] = React.useState<boolean | string>(false);
  const { isError, isLoading, data, fetchPOST } = usePOST();

  async function handleOTP (e: React.FormEvent) {
    e.preventDefault();
    if (opt.length !== 6) {
      setOtpError("Please Enter the Full OTP");
    } else {
      userData.otp =opt
      setOtpError(false);
      console.log("worked", userData);
     await fetchPOST("verifyOTP", userData )
    }
  }

  React.useEffect(() => {
    if (isError && isError.message) {
      toast.error(isError.message);
    }
    if (data && data.message) {
      toast.success("login ss");
      console.log(data)
      // redirect method
    }
  }, [data, isError]);

  return (
    <main className="flex justify-center items-center h-screen">
       <Toaster />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-3xl">Enter OTP</CardTitle>
          <CardDescription>
            Enter the OTP sent to your email to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <form onSubmit={handleOTP}>
            <InputOTP
              className=""
              maxLength={6}
              value={opt}
              onChange={(e: any) => setOpt(e)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {otpError && (
              <p className="text-sm text-red-500 font-semibold">{otpError}</p>
            )}
            <div className="flex justify-center mt-6">
              {!isLoading ? (
                <Button type="submit" className="">
                  Verify
                </Button>
              ) : (
                <Button className="">Verifing...</Button>
              )}
            </div>
            { isError && <p className="ml-2 font-semibold text-xs text-red-500">{isError.message}</p>}
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
