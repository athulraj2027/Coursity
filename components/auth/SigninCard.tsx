"use client";
import React from "react";
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

const SigninCard = () => {
  const signinHandler = async () => {};
  return (
    <Card className="w-full max-w-sm border-none shadow-none backdrop-blur-none">
      <CardHeader>
        <CardTitle className="text-xl">Signin</CardTitle>

        <CardAction>
          <Link href={`/sign-up`}>
            <Button variant="link"> Sign Up Here</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={signinHandler}>
          <div className="flex flex-col gap-3">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@gmail.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="role">Role</Label>
              </div>
              <RadioGroup defaultValue="student" className="flex">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="option-one" />
                  <Label htmlFor="teacher">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="teacher" id="option-two" />
                  <Label htmlFor="teacher">Teacher</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="option-two" />
                  <Label htmlFor="teacher">Admin</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SigninCard;
