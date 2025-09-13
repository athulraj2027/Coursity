"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchLearningHandler } from "@/actions/studentActions";
import Link from "next/link";

export default function MyLearningPage() {
  const { id } = useParams();
  const [enrollment, setEnrollment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getEnrollment() {
      setLoading(true);
      try {
        const data = await fetchLearningHandler(id as string);
        setEnrollment(data?.enrollment || null);
      } catch (err) {
        console.error("Error fetching enrollment:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) getEnrollment();
  }, [id]);

  if (loading) return <p className="p-6">Loading course details...</p>;
  if (!enrollment) return <p className="p-6">No enrollment found.</p>;

  const { course, status, enrolledAt } = enrollment;

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-3 gap-6">
      {/* Left side: Course + Teacher */}
      <div className="col-span-2 space-y-6">
        {/* Course Info */}
        <div className="border rounded-lg shadow p-6 bg-white">
          <h1 className="text-2xl font-bold mb-2">{course.name}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
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
        </div>

        {/* Teacher Info */}
        <div className="border rounded-lg shadow p-6 bg-white">
          <h2 className="text-lg font-semibold mb-2">Instructor</h2>
          <p className="text-gray-700">
            <span className="font-semibold">Teacher ID:</span>{" "}
            {course.teacher.id}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Expertise:</span>{" "}
            {course.teacher.expertise ?? "Not provided"}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Experience:</span>{" "}
            {course.teacher.experience ?? "Not provided"}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Verified:</span>{" "}
            {course.teacher.verifyStatus ? "✅ Yes" : "❌ No"}
          </p>
        </div>
      </div>

      {/* Right side: Enrollment + Lectures */}
      <div className="col-span-1 space-y-6">
        {/* Enrollment Info */}
        <div className="border rounded-lg shadow p-6 bg-white">
          <h2 className="text-lg font-semibold mb-2">Your Enrollment</h2>
          <p>
            <span className="font-semibold">Status:</span> {status}
          </p>
          <p>
            <span className="font-semibold">Enrolled On:</span>{" "}
            {new Date(enrolledAt).toLocaleDateString()}
          </p>

          {/* Progress bar */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">Progress</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{ width: `0%` }} // Replace with actual progress
              ></div>
            </div>
          </div>
        </div>

        {/* Lectures */}
        <div className="border rounded-lg shadow p-6 bg-white">
          <h2 className="text-lg font-semibold mb-4">Lectures</h2>
          {course.lectures && course.lectures.length > 0 ? (
            <div className="space-y-4 h-[300px] overflow-auto">
              {course.lectures.map((lecture: any) => (
                <div
                  key={lecture.id}
                  className="border rounded-lg p-4 hover:shadow-md transition"
                >
                  <h3 className="font-semibold text-gray-900">
                    {lecture.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Start: {new Date(lecture.startTime).toLocaleString()}
                  </p>
                  {lecture.endTime && (
                    <p className="text-sm text-gray-600">
                      End: {new Date(lecture.endTime).toLocaleString()}
                    </p>
                  )}
                  <div className="mt-3">
                    <Link
                      href={`/lecture/${lecture.meetingId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Join Lecture
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No lectures scheduled yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
