import toast from "react-hot-toast";
import verifySigninForm from "./verifySigninForm";

export default async function signinHandler(data: {
  email: string;
  password: string;
  role: string;
}) {
  if (!verifySigninForm(data)) return;

  try {
    const res = await fetch(`/api/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        role: data.role,
      }),
    });
    if (!res.ok) {
      toast.error("Failed to sign in");
      return;
    }
    toast.success("Signed in successfully");
    return res;
  } catch (error) {
    console.log("Error in signing in the user : ", error);
    toast.error("Signin failed");
    
  }
}
