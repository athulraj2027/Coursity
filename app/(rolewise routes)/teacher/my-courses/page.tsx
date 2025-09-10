"use client";
import fetchCoursesHandler from "@/actions/teacherActions/fetchCoursesHandler";
import Link from "next/link";
import { useEffect, useState } from "react";

type Course = {
  id: string;
  name: string;
  description: string;
  price: number;
  startDate: string;
  numberOfClasses: number;
  totalHours: number;
};

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCoursesHandler();
      setCourses(result.courses || []); // handle null/undefined
    };

    fetchData();
  }, []); // ✅ empty dependency = run only once

  return (
    <div>
      {courses && courses.length > 0 ? (
        courses.map((course) => (
          <Link href={`/teacher/my-courses/${course.id}`} key={course.id}>
            <p>{course.name}</p>
          </Link>
        ))
      ) : (
        <p>No courses found</p>
      )}
    </div>
  );
}
