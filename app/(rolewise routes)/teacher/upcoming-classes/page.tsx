"use client";

import fetchLectureHandler from "@/actions/teacherActions/fetchLecturesHandler";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Lecture = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  meetingId: string;
  course: {
    id: string;
    name: string;
  };
};

export default function TeacherUpcomingClassesPage() {
  const [lectures, setLectures] = useState<Lecture[]>([]);

  useEffect(() => {
    const fetchLectures = async () => {
      const res = await fetchLectureHandler();
      setLectures(res.lectures || []);
    };
    fetchLectures();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Upcoming Lectures</h1>

      {lectures && lectures.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3">Start Time</th>
                <th className="px-4 py-3">End Time</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {lectures.map((lecture) => (
                <tr
                  key={lecture.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {lecture.title}
                  </td>
                  <td className="px-4 py-3">{lecture.course.name}</td>
                  <td className="px-4 py-3">
                    {new Date(lecture.startTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(lecture.endTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 flex gap-2 justify-center">
                    <Link href={`/teacher/lectures/${lecture.id}`}>
                      <Button size="sm">View</Button>
                    </Link>
                    <Link
                      href={`/lecture/${lecture.meetingId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm">
                        Start
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No upcoming lectures found.</p>
      )}
    </div>
  );
}
