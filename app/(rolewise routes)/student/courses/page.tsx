"use client";
import { fetchCoursesHandler } from "@/actions/studentActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

export default function CoursePage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCoursesHandler();
      setCourses(result || []); // handle null/undefined
    };

    fetchData();
  }, []);
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Explore Courses</h1>
      <Input placeholder="Search by name" />
      {courses && courses.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {courses.map((course) => (
            <Card
              key={course.id}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold line-clamp-1">
                  {course.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600 text-sm line-clamp-2">
                  {course.description}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Start Date:</span>{" "}
                  {new Date(course.startDate).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Classes:</span>{" "}
                  {course.numberOfClasses}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Total Hours:</span>{" "}
                  {course.totalHours}
                </p>
                <p className="text-sm font-semibold">
                  ₹ {course.price.toLocaleString()}
                </p>

                <div className="flex flex-col gap-2 mt-3">
                  <Link href={`/student/courses/${course.id}`}>
                    <Button className="w-full">View Course</Button>
                  </Link>

                  {/* Conditional Buttons */}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No courses found</p>
      )}
    </div>
  );
}
