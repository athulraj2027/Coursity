import TeacherNavbar from "@/components/Teacher Components/TeacherNavbar";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1  bg-white">
      {" "}
      <TeacherNavbar />
      {children}
    </main>
  );
}
