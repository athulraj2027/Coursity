import { loadRazorpay } from "@/helpers/loadRazorpay";
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
      } catch {}
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

export async function paymentHandler({
  courseId,
  amount,
  studentId,
  router,
}: {
  courseId: string;
  amount: number;
  studentId: string;
  router: any;
}) {
  try {
    console.log("studentId : ", studentId);
    const loaded = await loadRazorpay();
    if (!loaded) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const res = await fetch("/api/payment/create-order", {
      method: "POST",
      body: JSON.stringify({ amount }),
    });

    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RZP_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Coursity.",
      description: "Course Purchase",
      order_id: order.id,
      handler: async function (response: any) {
        // Step 3: Call backend to verify payment
        await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...response,
            courseId,
            userId: studentId,
            amount,
          }),
        });
        toast.success("Course purchased successfully");
        router.push("/student/courses");
      },
      prefill: {
        name: "Student Name",
        email: "student@example.com",
      },
      theme: { color: "#0fbcf9" },
    };
    console.log("hi");
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  } catch (error) {
    console.log("Error in payment : ", error);
    throw new Error("Payment handler failed");
  }
}

export async function fetchLearningHandler(id: string) {
  try {
    const res = await fetch(`/api/my-learning/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      const errorMsg = await res.json();
      toast.error(errorMsg.error || "Failed to fetch.Please try again");
      throw new Error("Fetching failed");
    }

    const learnings = await res.json();
    return learnings;
  } catch (error) {
    console.log("Error in fetching learnnigs : ", error);
    toast.error("Please refresh the page");
    throw new Error("Fetching learnings failed");
  }
}
