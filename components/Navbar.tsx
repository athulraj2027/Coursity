"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const logoutHandler = async () => {
    await logout();
    router.push("/");
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div className="w-full flex justify-around items-center p-3 backdrop-blur-xs fixed top-0">
      <h1 className="text-2xl font-extrabold text-black cursor-pointer hover:underline">
        Coursity.
      </h1>

      {user ? (
        <div className="flex gap-3 items-center">
          <div className="flex flex-col">
            <span className="text-xl">{user.username}</span>
            <span className="text-xs text-gray-600">{user.role}</span>
          </div>

          <Button
            className="bg-red-600 px-9 rounded-full cursor-pointer hover:bg-red-800"
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </div>
      ) : (
        <Link href={`/sign-in`}>
          <Button className="px-9 rounded-full cursor-pointer">Login</Button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
