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
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation'

interface SignInformProps {
  userData?: any;
  userResendData?: any;
  handleData: (para: any) => void;
}

export default function OtpForm({
  userData,
  userResendData,
  handleData,
}: SignInformProps) {
  const [opt, setOpt] = React.useState<string>("");
  const [otpError, setOtpError] = React.useState<boolean | string>(false);
  const [counter, setCounter] = React.useState<number>(50); // Start with 30 seconds countdown

  const router = useRouter() 

  console.log("userResend -", userData)
  console.log("userResendData -", userResendData)


  const { isError, isLoading, data, fetchPOST } = usePOST();

  async function handleOTP(e: React.FormEvent) {
    e.preventDefault();
    if (opt.length !== 6) {
      setOpt("");
      setOtpError("Please Enter the full OTP");
    } else {
      userData.otp = opt;
      setOpt("");
      setOtpError(false);
      await fetchPOST("verifyOTP", userData);
    }
  }

  React.useEffect(() => {
    if (isError && isError.message) {
      toast.error(isError.message);
      setOtpError(isError.message);
    }
    if (data && data.message && !data.response) {
      toast.success(data.message);
      router.push("/login")   
    }
    if (data && data.response && data.message) {
      toast.success(data.message);
      handleData?.(data.response);
    }

  }, [data, isError]);

  const resendOTP = async () => {
    try {
      setOtpError(false);
      setOpt("");
      await fetchPOST("register", userResendData);
      setCounter(50);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Timer Effect
  React.useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup the interval
    }
  }, [counter]);

  return (
    <main className="flex justify-center items-center h-screen">
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

            <div className="flex justify-center mt-6 gap-4">
              {!isLoading ? (
                <Button type="submit">Verify</Button>
              ) : (
                <Button className="">Verifying...</Button>
              )}
              {counter <= 0 ? (
                <Button onClick={resendOTP}>Resend OTP</Button>
              ) : (
                <Button disabled>Resend OTP in {counter}</Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
