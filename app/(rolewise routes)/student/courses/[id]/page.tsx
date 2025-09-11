"use client";
import { fetchCourseHandler } from "@/actions/studentActions";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface User {
  id: string;
  username: string;
  email: string;
  role: "TEACHER" | "STUDENT" | "ADMIN";
  createdAt: string;
  updatedAt: string;
}

export interface Teacher {
  id: string;
  userId: string;
  bio: string | null;
  expertise: string | null;
  experience: string | null;
  verifyStatus: boolean;
  user: User;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
  startDate: string; // ISO string from API
  numberOfClasses: number;
  totalHours: number;
  createdAt: string;
  updatedAt: string;
  teacherId: string;
  teacher: Teacher;
}

export default function CoursePage() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course>();
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const data = await fetchCourseHandler(id);
      console.log("Fetched course:", data);
      setCourse(data);
    };

    if (id) {
      fetchData();
    }
  }, [id]); // 👈 add `id` as dependency

  if (!course) return <p>Loading...</p>;
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="shadow-md">
        {/* Course Header */}
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{course.name}</CardTitle>
          <p className="text-gray-600">{course.description}</p>
        </CardHeader>

        {/* Course Details */}
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>
              <span className="font-medium">Start Date:</span>{" "}
              {new Date(course.startDate).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Classes:</span>{" "}
              {course.numberOfClasses}
            </p>
            <p>
              <span className="font-medium">Total Hours:</span>{" "}
              {course.totalHours}
            </p>
            <p>
              <span className="font-medium">Price:</span> ₹{" "}
              {course.price.toLocaleString()}
            </p>
          </div>

          {/* Teacher Info */}
          <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-semibold text-lg mb-2">About the Teacher</h3>
            <p className="text-sm">
              <span className="font-medium">Username:</span>{" "}
              {course.teacher?.user?.username || "N/A"}
            </p>
            <p className="text-sm">
              <span className="font-medium">Email:</span>{" "}
              {course.teacher?.user?.email || "N/A"}
            </p>
            <p className="text-sm">
              <span className="font-medium">Expertise:</span>{" "}
              {course.teacher?.expertise || "Not provided"}
            </p>
            <p className="text-sm">
              <span className="font-medium">Experience:</span>{" "}
              {course.teacher?.experience || "Not provided"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <Link href={`/student/checkout/${course.id}`}>
              <Button className="flex-1 cursor-pointer">Enroll</Button>
            </Link>
            <Link href="/student/courses">
              <Button variant="outline" className="flex-1">
                Back to Courses
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
