import toast from "react-hot-toast";

export default async function CreateLectureHandler({
  courseId,
  title,
  startTime,
  endTime,
}: {
  courseId: string;
  title: string;
  startTime: Date;
  endTime?: Date;
}) {
  try {
    const res = await fetch("/api/lecture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        courseId,
        title,
        startTime,
        endTime,
      }),
    });

    const result = await res.json();
    if (!res.ok) {
      toast.error(result.error || "Failed to create lecture");
      throw new Error("Failed to create lecture");
    }

    toast.success("Lecture created successfully");
    return result; // lecture object
  } catch (error) {
    console.error("error in creating lecture : ", error);
    toast.error("Failed to create lecture");
    return null;
  }
}
