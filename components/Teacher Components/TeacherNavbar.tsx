import Link from "next/link";
import React from "react";

const TeacherNavbar = () => {
  return (
    <div className="w-full flex justify-center items-center h-10 bg-black  top-0">
      <ul className="flex gap-7 sm:10 text-white font-semibold">
        <li>
          <Link
            href={`/teacher/my-courses`}
            className="hover:text-gray-300 transition-colors duration-300 ease-in-out"
          >
            My courses
          </Link>
        </li>
        <li>
          <Link
            href={`/teacher/new-course`}
            className="hover:text-gray-300 transition-colors duration-300 ease-in-out"
          >
            Create New Course
          </Link>
        </li>
        <li>
          <Link
            href={`/teacher/support`}
            className="hover:text-gray-300 transition-colors duration-300 ease-in-out"
          >
            Support
          </Link>
        </li>
        <li>
          <Link
            href={`/teacher/scheduled-classes`}
            className="hover:text-gray-300 transition-colors duration-300 ease-in-out"
          >
            Scheduled Classes
          </Link>
        </li>
        <li>
          <Link
            href={`/teacher/my-profile`}
            className="hover:text-gray-300 transition-colors duration-300 ease-in-out"
          >
            My Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TeacherNavbar;
