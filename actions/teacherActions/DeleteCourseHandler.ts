import toast from "react-hot-toast";

export default async function DltCourseHandler(id: string) {
  try {
    const res = await fetch(`/api/my-courses/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const result = await res.json();
    if (!res.ok) {
      toast.error(result.error || "Failed to create course");
      throw new Error("Deleting course failed");
    }

    toast.success("Course deleted successfully");
  } catch (error) {
    console.error("Error in creating course : ", error);
    return;
  }

  return;
}
