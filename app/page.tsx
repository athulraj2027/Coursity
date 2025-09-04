import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-4">
      <div className="flex flex-col justify-around items-center text-center ">
        <h1 className="text-4xl md:text-[4.5rem] font-bold leading-tight">
          Teaching Made Simple.
          <br /> Learning Made Powerful.
        </h1>
        <p className="mt-4 text-md text-gray-500 italic md:text-xl">
          Coursity - Courtesy of curiosity — the engine of growth.
        </p>
        <Link href={"/sign-in"}>
          {" "}
          <button className="bg-black px-9 rounded-2xl py-2 text-white font-bold my-4 cursor-pointer">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
