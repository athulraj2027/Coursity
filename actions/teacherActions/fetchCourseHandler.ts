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
      toast.error(result.error);
      return null; // Return null instead of toast result
    }

    console.log("res : ", result);

    // Since your component expects { course: [...] }, return the full result
    return result; // ✅ This returns { course: [courseData] }

    // OR if you want to return just the course data:
    // return { course: result.course }; // Same thing
  } catch (error) {
    console.log("Failed to fetch course : ", error);
    toast.error("Failed to fetch course");
    return null; // Return null on error instead of undefined
  }
}
