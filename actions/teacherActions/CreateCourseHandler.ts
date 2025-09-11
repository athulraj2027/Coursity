import toast from "react-hot-toast";

interface CourseFormData {
  name: string;
  description: string;
  price: string;
  startDate: string;
  noOfClasses: string;
  totalHours: string;
}

export default async function CreateCourseHandler(
  data: CourseFormData,
) {
  try {
    const res = await fetch(`/api/course`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const result = await res.json();

    if (!res.ok) {
      return toast.error(result.error || "Failed to create course");
    }
    toast.success("Course created successfully");
    window.location.href = "/teacher";
  } catch (error) {
    console.error("Error in creating course : ", error);
    return;
  }
}