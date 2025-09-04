import toast from "react-hot-toast";

enum Role {
  Student = "student",
  Teacher = "teacher",
}

export default function verifySignupForm(data: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}): boolean {
  const { username, email, password, confirmPassword, role } = data;

  const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
  // Letters, numbers, underscores, 3–16 chars
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Basic email validation
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  // Min 8 chars, at least 1 letter, 1 number, 1 special char

  // ✅ Required fields
  if (!username || !email || !password || !confirmPassword || !role) {
    toast.error("All fields are required");
    return false;
  }

  // ✅ Username
  if (!usernameRegex.test(username)) {
    toast.error(
      "Username must be 3–16 characters (letters, numbers, underscores)"
    );
    return false;
  }

  // ✅ Email
  if (!emailRegex.test(email)) {
    toast.error("Invalid email address");
    return false;
  }

  // ✅ Password
  if (!passwordRegex.test(password)) {
    toast.error(
      "Password must be at least 8 characters and include 1 letter, 1 number, 1 special character"
    );
    return false;
  }

  // ✅ Confirm password
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  // ✅ Role
  if (!Object.values(Role).includes(role as Role)) {
    toast.error("Invalid role selected");
    return false;
  }

  return true;
}
