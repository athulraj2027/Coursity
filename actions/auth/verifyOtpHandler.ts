import toast from "react-hot-toast";

export default async function verifyOtpHandler(
  otp: string,
  data: {
    username: string;
    email: string;
    password: string;
    role: string;
  }
) {
  try {
    const res = await fetch(`/api/otp/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp, email: data.email }),
    });

    if (!res.ok) {
      const err = await res.json();
      toast.error("Failed to verify OTP");
      return { error: err.error || "Verification failed" };
    }
  } catch (error) {
    console.log("error in verifying otp : ", error);
    return;
  }
  try {
    const res = await fetch(`/api/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      toast.error("Failed to create account");
      return { error: err.error || "Signup failed" };
    }

    const result = await res.json();

    return { success: true, user: result.user };
  } catch (error) {
    console.log("error in creating account : ", error);
  }
}
