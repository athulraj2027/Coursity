"use client";
import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import verifyOtpHandler from "@/actions/auth/verifyOtpHandler";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type OtpCardProps = {
  setOtpSent: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    username: string;
    email: string;
    password: string;
    role: string;
  };
};

const OtpCard = ({ setOtpSent, data }: OtpCardProps) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill("")); // 6-digit OTP
  const router = useRouter();

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // auto move to next input
      if (value && index < otp.length - 1) {
        const next = document.getElementById(`otp-${index + 1}`);
        (next as HTMLInputElement)?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      (prev as HTMLInputElement)?.focus();
    }
  };

  const verifyHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    console.log("Entered OTP:", otpValue);
    try {
      const res = await verifyOtpHandler(otpValue, data);
      if (res?.success !== true) {
        toast.error("Verification failed");
        return;
      }
      setOtpSent(false);

      toast.success("User successfully registered");
      router.push("/sign-in");
    } catch (error) {
      toast.error("Verification failed");
      console.log("error in verifying : ", error);
    }
  };

  const resendOtpHandler = async () => {
    console.log("Resend OTP");
    setOtpSent(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Verify OTP</CardTitle>

          <CardAction>
            <Button variant="link" onClick={resendOtpHandler}>
              Resend OTP
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={verifyHandler}>
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="w-12 h-12 text-center text-xl"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
            <CardFooter className="flex-col gap-2 mt-6">
              <Button type="submit" className="w-full">
                Verify OTP
              </Button>
              <p
                className="underline cursor-pointer"
                onClick={() => setOtpSent(false)}
              >
                Go back
              </p>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OtpCard;
