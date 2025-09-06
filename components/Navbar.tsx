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
    router.replace("/");
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div className="w-full flex sm:justify-around justify-between items-center sm:p-3 p-1 backdrop-blur-xs fixed top-0">
      <h1 className="text-2xl font-extrabold text-black cursor-pointer hover:underline">
        Coursity.
      </h1>

      {user ? (
        <div className="flex gap-3 items-center">
          <div className="flex flex-col text-center">
            <span className="sm:text-xl text-lg font-semibold">
              {user.username
                ? user.username.split(" ")[0].charAt(0).toUpperCase() +
                  user.username.split(" ")[0].slice(1).toLowerCase()
                : ""}
            </span>
            <span className="sm:text-xs text-[0.8rem] text-gray-600">
              {user.role.charAt(0).toUpperCase() +
                user.role.split(" ")[0].slice(1).toLowerCase()}{" "}
              account
            </span>
          </div>

          <Button
            className="bg-red-600 sm:px-9 px-4 rounded-full cursor-pointer hover:bg-red-800"
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </div>
      ) : (
        <Link href={`/sign-in`}>
          <Button className="rounded-full cursor-pointer sm:px-9 px-4">
            Login
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
