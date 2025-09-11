"use client";

import fetchCourseHandler from "@/actions/teacherActions/fetchCourseHandler";
import CreateLectureForm from "@/components/Teacher Components/CreateLectureForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";

export default function MyCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Unwrap params in useEffect
  useEffect(() => {
    params.then((resolvedParams) => {
      console.log("Params resolved:", resolvedParams);
      setId(resolvedParams.id);
    });
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchCourseDetails = async () => {
      try {
        console.log("Fetching course with id:", id);
        const result = await fetchCourseHandler(id);

        console.log("Full result:", result);

        if (
          result &&
          result.course &&
          Array.isArray(result.course) &&
          result.course.length > 0
        ) {
          const courseData = result.course[0];
          console.log("Setting course:", courseData);
          setCourse(courseData);
        } else {
          console.log("Invalid course data structure");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading || !id) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!course) {
    return <p className="text-center mt-10">Course not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-3">Course details</h1>
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {course.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            {course.description}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>
              <span className="font-semibold">Price:</span> ₹{course.price}
            </p>
            <p>
              <span className="font-semibold">Start Date:</span>{" "}
              {new Date(course.startDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">Classes:</span>{" "}
              {course.numberOfClasses}
            </p>
            <p>
              <span className="font-semibold">Total Hours:</span>{" "}
              {course.totalHours}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Lectures</h3>
            {course.lectures && course.lectures.length === 0 ? (
              <p className="text-gray-500">No lectures yet.</p>
            ) : (
              <ul className="space-y-2">
                {(course.lectures || []).map((lecture: any, index: number) => (
                  <li
                    key={index}
                    className="border p-3 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{lecture.title}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(lecture.startTime).toLocaleString()} -{" "}
                        {new Date(lecture.endTime).toLocaleTimeString()}
                      </p>
                    </div>
                    <Button size="sm">Start</Button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-end mt-6">
            <Button onClick={() => setIsFormVisible(true)}>
              Create New Lecture
            </Button>
          </div>

          {isFormVisible && id && (
            <CreateLectureForm
              courseId={id}
              setState={setIsFormVisible}
              onSuccess={(newLecture) => {
                console.log(newLecture);
                setCourse((prev: any) => ({
                  ...prev,
                  lectures: [...prev.lectures, newLecture], // 👈 optimistic update
                }));
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
