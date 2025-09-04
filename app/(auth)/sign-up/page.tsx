import SignupCard from "@/components/auth/SignupCard";

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px)] px-4">
      {" "}
      <div className="flex flex-col items-center py-10">
        <h1 className="text-4xl md:text-[2.5rem] font-bold leading-tight">
          Welcome to Coursity
        </h1>
        <SignupCard />
      </div>
    </div>
  );
}
