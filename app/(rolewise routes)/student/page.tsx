export default function StudentHomePage() {
  return (
    <>
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)] px-4 w-full">
        <div className="flex flex-col justify-around items-center text-center ">
          <h1 className="text-4xl md:text-[4.5rem] font-bold leading-tight">
            Focused learning today,
            <br /> limitless opportunities tomorrow.
          </h1>
          <p className="mt-4 text-md text-gray-500 italic md:text-xl">
            Coursity - Courtesy of curiosity — the engine of growth.
          </p>
        </div>
      </div>
      <div className="p-8 sm:px-12 items-center flex flex-col bg-white min-h-screen">
        <h1 className="text-3xl md:text-[2.5rem] font-bold leading-tight mb-12 text-black">
          Our Top Teachers
        </h1>
      </div>
    </>
  );
}
