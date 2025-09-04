import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex w-full justify-between py-10 px-5 bg-black text-white ">
      <Link href={`/`}>
        <h1 className="text-2xl font-extrabold cursor-pointer hover:underline">
          Coursity.
        </h1>
      </Link>
      <p>Developed by Athul</p>
    </div>
  );
};

export default Footer;
