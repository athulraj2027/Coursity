import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="w-full flex justify-around items-center p-3 backdrop-blur-none fixed top-0">
      <Link href={`/`}>
        <h1 className="text-2xl font-extrabold text-black cursor-pointer hover:underline">
          Coursity.
        </h1>
      </Link>{" "}
      <Link href={`/sign-in`}>
        <Button className="px-9 rounded-full cursor-pointer">Login</Button>
      </Link>
    </div>
  );
};

export default Navbar;
