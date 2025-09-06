import VerifyCreateCourseForm from "./VerifyCreateCourseForm";

interface CourseFormData {
  name: string;
  description: string;
  price: string;
  startDate: string;
  noOfClasses: string;
  totalHours: string;
}

export default async function CreateCourseHandler(data: CourseFormData) {
  if (!VerifyCreateCourseForm(data)) return;

  try {
    const res = await fetch(`/api/course/create`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
    }
  } catch (error) {
    console.error("Error in creating course : ", error);
    return;
  }
  return;
}
