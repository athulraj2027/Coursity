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
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import signupHandler from "@/actions/auth/signupHandler";
import OtpCard from "./OtpCard";

const SignupCard = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password,
      confirmPassword,
      role,
    };

    console.log(data);
    try {
      setLoading(true);
      signupHandler(data, setOtpSent);
    } catch (error) {
      console.log("error in signup : ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full max-w-sm border-none shadow-none backdrop-blur-none">
        <CardHeader>
          <CardTitle className="text-xl"> Create new account</CardTitle>

          <CardAction>
            <Link href={`/sign-in`}>
              <Button variant="link"> Sign In Here</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="you3453"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@gmail.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="*******"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm your Password</Label>
                </div>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  placeholder="*******"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="role">Role</Label>
                </div>
                <RadioGroup
                  defaultValue="student"
                  className="flex"
                  onValueChange={(value) => setRole(value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="teacher" id="teacher" />
                    <Label htmlFor="teacher">Teacher</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {otpSent ? "OTP sent" : "Sign up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button variant="outline" className="w-full" disabled={loading}>
            Login with Google
          </Button>
        </CardFooter>
      </Card>
      {otpSent && (
        <OtpCard
          setOtpSent={setOtpSent}
          data={{ username, email, password, role }}
        />
      )}
    </>
  );
};

export default SignupCard;
