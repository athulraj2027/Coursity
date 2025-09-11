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

  // unwrap params
  useEffect(() => {
    params.then((resolvedParams) => setId(resolvedParams.id));
  }, [params]);

  useEffect(() => {
    if (!id) return;

    const fetchCourseDetails = async () => {
      try {
        const result = await fetchCourseHandler(id);
        if (
          result &&
          result.course &&
          Array.isArray(result.course) &&
          result.course.length > 0
        ) {
          setCourse(result.course[0]);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading || !id) return <p className="text-center mt-10">Loading...</p>;
  if (!course) return <p className="text-center mt-10">Course not found</p>;

  // sort lectures (newest first)
  const sortedLectures = [...(course.lectures || [])].sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Course Details</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side - Course details */}
        <Card className="lg:col-span-2 shadow-md rounded-2xl">
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

            <div className="flex justify-end mt-6">
              <Button onClick={() => setIsFormVisible(true)}>
                Create New Lecture
              </Button>
            </div>

            {isFormVisible && id && (
              <CreateLectureForm
                courseId={id}
                setState={setIsFormVisible}
                onSuccess={(newLecture) =>
                  setCourse((prev: any) => ({
                    ...prev,
                    lectures: [...prev.lectures, newLecture],
                  }))
                }
              />
            )}
          </CardContent>
        </Card>

        {/* Right side - Lectures list */}
        <Card className="shadow-md rounded-2xl w-[400px] h-[300px] overflow-y-auto mx-auto lg:mx-0">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-center ">
              Lectures
            </CardTitle>
          </CardHeader>
          <CardContent>
            {sortedLectures.length === 0 ? (
              <p className="text-gray-500 text-center">No lectures yet.</p>
            ) : (
              <ul className="space-y-3">
                {sortedLectures.map((lecture: any, index: number) => {
                  const now = new Date();
                  const start = new Date(lecture.startTime);
                  const timeDiff =
                    (start.getTime() - now.getTime()) / 1000 / 60; // minutes
                  const canStart = timeDiff <= 5 && timeDiff >= 0;

                  return (
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

                      {canStart ? (
                        <Button size="sm">Start</Button>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <Button size="sm" variant="outline">
                            Change
                          </Button>
                          <Button size="sm" variant="destructive">
                            Delete
                          </Button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
