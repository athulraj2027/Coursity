import toast from "react-hot-toast";

export default async function fetchLectureHandler() {
  try {
    const res = await fetch(`/api/scheduled-classes`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();

      toast.error(error.error || "Failed to fetch.Please refresh the page");
      throw new Error("Result not ok");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.log("Error in fetching upcoming classes : ", error);
    toast.error("Something went wrong");
    throw new Error("Server error in fetching");
  }
}
