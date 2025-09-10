export default async function fetchCoursesHandler() {
  try {
    const res = await fetch("/api/my-courses", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const result = await res.json();
    if (!res.ok) window.location.href = "/teacher";
    return result;
  } catch (error) {
    console.log("Failed to fetch courses : ", error);
  }
}
