import toast from "react-hot-toast";
import verifySignupForm from "./verifySignupForm";

export default async function signupHandler(
  data: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
  },
  setOtpSent: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (!verifySignupForm(data)) {
    return;
  }
  try {
    const res = await fetch(`/api/otp/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
      }),
    });

    if (!res.ok) {
      toast.error("Failed to send OTP");
      return;
    }

    toast.success("OTP sent to your email");
    setOtpSent(true);
    return { otpRequested: true, formData: data };
  } catch (error) {
    console.log("error in creating account : ", error);
  }
  
}
