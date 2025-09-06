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
import toast from "react-hot-toast";
import signinHandler from "@/actions/auth/signinHandler";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const SigninCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const signinFunction = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { email, password, role };
    try {
      setLoading(true);
      const res = await signinHandler(data);
      const result = await res?.json();
      console.log("res : ", res);
      if (result?.success === true) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        setUser(result.user);
        router.replace(`/${result.user.role.toLowerCase()}`);
        toast.success("Signed in successfully");
      } else return;
    } catch (error) {
      console.log("Error in signing in : ", error);
      toast.error("Failed to sign in");
    } finally {
      setLoading(false);
    }
  };
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
        <form onSubmit={signinFunction} noValidate>
          <div className="flex flex-col gap-3">
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
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                placeholder="********"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
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
                  <Label htmlFor="teacher">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="teacher" id="teacher" />
                  <Label htmlFor="teacher">Teacher</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="teacher">Admin</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
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
