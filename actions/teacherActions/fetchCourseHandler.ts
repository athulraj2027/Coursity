import toast from "react-hot-toast";

export default async function fetchCourseHandler(id: string) {
  try {
    const res = await fetch(`/api/my-courses/${id}`, {
      method: "GET",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });

    const result = await res.json();

    if (!res.ok) {
      return toast.error(result.error);
    }

    return result.course;
  } catch (error) {
    console.log("Failed to fetch course : ", error);
  }
}
