import { toast } from "react-hot-toast";

interface CourseFormData {
  name: string;
  description: string;
  price: string;
  startDate: string;
  noOfClasses: string;
  totalHours: string;
}

export default function VerifyCreateCourseForm(data: CourseFormData): boolean {
  const { name, description, price, startDate, noOfClasses, totalHours } = data;

  if (
    !name ||
    !description ||
    !price ||
    !startDate ||
    !noOfClasses ||
    !totalHours
  ) {
    toast.error("Please fill in all the fields before creating the course.");
    return false;
  }

  if (Number(price) <= 0) {
    toast.error("Price must be greater than 0.");
    return false;
  }

  if (Number(noOfClasses) <= 0) {
    toast.error("Number of classes must be greater than 0.");
    return false;
  }

  if (Number(totalHours) <= 0) {
    toast.error("Total hours must be greater than 0.");
    return false;
  }

  return true; // ✅ valid form
}
