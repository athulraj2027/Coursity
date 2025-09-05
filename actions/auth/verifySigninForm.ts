import toast from "react-hot-toast";

enum Role {
  Student = "student",
  Teacher = "teacher",
  Admin = "admin",
}
export default function verifySigninForm(data: {
  email: string;
  password: string;
  role: string;
}): boolean {
  try {
    const { email, password, role } = data;

    console.log(data);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password || !role) {
      toast.error("All fields are required");
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return false;
    }

    if (!Object.values(Role).includes(role as Role)) {
      toast.error("Invalid role selected");
      return false;
    }
    return true;
  } catch (error) {
    toast.error("Verifying form failed");
    return false;
  }
}
