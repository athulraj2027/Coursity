import toast from "react-hot-toast";

export async function fetchCoursesHandler() {
  try {
    const res = await fetch("/api/course", {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });

    const courses = await res.json();
    if (!res.ok) {
      toast.error(
        courses.error || "Failed to fetch courses.Please refresh the page"
      );
      throw new Error("Failed to fetch courses");
    }
    console.log(courses);
    return courses;
  } catch (error) {
    console.error("Error in fetching courses  : ", error);
    throw new Error("Server error in fetching courses");
  }
}

export async function fetchCourseHandler(id: string) {
  try {
    const res = await fetch(`/api/course/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      
      let errorMessage = "Failed to fetch course data";
      try {
        const errorData = await res.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
       
      }
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    const data = await res.json(); // ✅ only parse JSON if OK
    return data;
  } catch (error) {
    console.error("Error in fetching course  : ", error);
    throw new Error("Server error in fetching course");
  }
}
