import StudentNavbar from "@/components/Student components/StudentNavbar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1  bg-white">
      {" "}
      <StudentNavbar />
      {children}
    </main>
  );
}
