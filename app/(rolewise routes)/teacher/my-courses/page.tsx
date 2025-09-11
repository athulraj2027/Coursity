"use client";
import fetchCoursesHandler from "@/actions/teacherActions/fetchCoursesHandler";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ConfirmationCard from "@/components/ConfirmationCard";
import DltCourseHandler from "@/actions/teacherActions/DeleteCourseHandler";

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
  const [showDltConfirmationCard, setShowDltConfirmationCard] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchCoursesHandler();
      setCourses(result.courses || []); // handle null/undefined
    };

    fetchData();
  }, []); // ✅ empty dependency = run only once

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">My Courses</h1>

      {courses && courses.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  <Link href={`/teacher/my-courses/${course.id}`}>
                    <Button className="w-full">View Course</Button>
                  </Link>

                  {/* Conditional Buttons */}
                  {(() => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // normalize to midnight
                    const startDate = new Date(course.startDate);

                    if (startDate >= today) {
                      // starts today or in the future → allow Delete
                      return (
                        <>
                          <Button
                            variant="destructive"
                            className="w-full"
                            onClick={() => {
                              setId(course.id);
                              setShowDltConfirmationCard(true);
                            }}
                          >
                            Delete
                          </Button>
                          <Button variant="outline" className="w-full">
                            Edit
                          </Button>
                        </>
                      );
                    }
                    return (
                      <Button variant="outline" className="w-full">
                        Edit
                      </Button>
                    );
                  })()}
                </div>
              </CardContent>
            </Card>
          ))}
          {showDltConfirmationCard && (
            <ConfirmationCard
              onConfirm={() => {
                DltCourseHandler(id);
              }}
              setIsConfirmationVisible={setShowDltConfirmationCard}
              question="Are you sure to delete the course?"
              data={""}
            />
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">No courses found.</p>
      )}
    </div>
  );
}
