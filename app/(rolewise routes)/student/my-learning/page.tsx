"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyLearningPage() {
  const [enrollments, setEnrollments] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/my-learning", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        // API returns array of studentProfiles → extract enrollments
        if (Array.isArray(data) && data.length > 0) {
          setEnrollments(data[0].enrollments ?? []);
        }
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 sm:p-10">
        <h2 className="text-2xl font-bold mb-6 text-center">My Learning</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
          {enrollments.length === 0 ? (
            <p className="text-center">
              You have not enrolled in any courses yet.
            </p>
          ) : (
            enrollments.map((enrollment) => {
              const course = enrollment.course;
              if (!course) return null;

              return (
                <Card
                  key={enrollment.id}
                  className="hover:shadow-lg transition-shadow duration-300 sm:w-[300px] text-center"
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold line-clamp-1">
                      {course.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {course.description}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Teacher:</span>{" "}
                      {course.teacher?.name}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Status:</span>{" "}
                      {enrollment.status}
                    </p>

                    <div className="flex flex-col gap-2 mt-3">
                      <Link href={`/student/my-learning/${enrollment.id}`}>
                        <Button className="w-full">View Course</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
