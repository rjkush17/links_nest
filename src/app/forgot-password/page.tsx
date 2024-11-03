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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import usePOST from "@/hooks/usePOST";

function page() {
  const { isError, isLoading, data, fetchPOST } = usePOST();
  const router = useRouter();

  const [changeScreen, setChangescreen] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Record<string, string> | null>();
  const [opt, setOpt] = React.useState<string>("");
  const [otpError, setOtpError] = React.useState<boolean | string>(false);
  const [counter, setCounter] = React.useState<number>(0);

  const [formData, setFromData] = React.useState<Record<string, string>>({
    email: "",
    password: "",
    re_password: "",
  });

  const handleForm = (e: any) => {
    const { name, value } = e.target;
    setFromData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  async function handleSubmit(e: any) {
    e.preventDefault();
    setError(null);

    let hasError = false;

    if (formData.email === "" || !formData.email) {
      setError((prev: any) => ({
        ...prev,
        InputEmailError: "Password should have at least 4 letters",
      }));
      hasError = true;
    }
    if (formData.password.length < 6) {
      setError((prev: any) => ({
        ...prev,
        InputPasswordError: "Password should have at least 4 letters",
      }));
      hasError = true;
    }
    if (formData.password !== formData.re_password) {
      setError((prev: any) => ({
        ...prev,
        InputRePasswordError: "Password should have at least 4 letters",
      }));
      hasError = true;
    }

    if (!hasError) {
      await fetchPOST("forgot-password/created_OTP", formData);
      if (isError) {
        setChangescreen(false);
        setCounter(60);
      }
      return;
    }
    return;
  }

  async function handleOTP(e: React.FormEvent) {
    e.preventDefault();
    if (opt.length !== 6) {
      setOpt("");
      setOtpError("Please Enter the full OTP");
    } else {
      setOpt("");
      setOtpError(false);
      await fetchPOST("forgot-password/verify_OTP", {
        email: formData.email,
        otp: opt,
      });
    }
  }

  const resendOTP = async () => {
    try {
      setOtpError(false);
      setOpt("");
      await fetchPOST("forgot-password/created_OTP", formData);
      setCounter(50);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  React.useEffect(() => {
    if (isError && isError.message) {
      toast.error(isError.message);
    }
    if (data && data.message && !data.response) {
      toast.success(data.message);
    }
    if (data && data.message && !data.response) {
      toast.success(data.message);
      router.push("/login");
    }
  }, [data, isError]);

  React.useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup the interval
    }
  }, [counter]);

  return (
    <main className="flex justify-center items-center w-full h-screen">
      {changeScreen && (
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle className="text-3xl">Forgot Password ? </CardTitle>
            <CardDescription>
              No worries, Here you can reset the password.
            </CardDescription>
          </CardHeader>
          <CardContent className="w-11/12 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                {/* input for email */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Write your email"
                    value={formData.email}
                    onChange={(e) => handleForm(e)}
                    autoComplete="email"
                    required
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
                    name="password"
                    type="password"
                    placeholder="type password"
                    value={formData.password}
                    autoComplete="password"
                    onChange={(e) => handleForm(e)}
                    required
                  />
                  {error && error.InputPasswordError && (
                    <p className="ml-2 font-semibold text-xs text-red-500">
                      {error.InputPasswordError}
                    </p>
                  )}
                </div>
                {/* input for confrim password */}
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="passowrd">Confirm Password</Label>
                  <Input
                    name="re_password"
                    type="password"
                    placeholder="confirm password"
                    value={formData.re_password}
                    autoComplete="password"
                    onChange={(e) => handleForm(e)}
                    required
                  />
                  {error && error.InputRePasswordError && (
                    <p className="ml-2 font-semibold text-xs text-red-500">
                      {error.InputRePasswordError}
                    </p>
                  )}
                </div>
              </div>

              {isLoading ? (
                <Button className="w-full py-4 mt-4" disabled>
                  Sending OTP...
                </Button>
              ) : (
                <Button className="w-full py-4 mt-4" type="submit">
                  Send Verification OTP
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
      )}{" "}
      {!changeScreen && (
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
                  <Button onClick={() => resendOTP()}>Resend OTP</Button>
                ) : (
                  <Button disabled>Resend OTP in {counter}</Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </main>
  );
}

export default page;
