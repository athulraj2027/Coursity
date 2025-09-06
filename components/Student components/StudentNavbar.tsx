import Link from "next/link";
import React from "react";

const StudentNavbar = () => {
  return (
    <div className="w-full flex justify-center items-center h-10 bg-gray-300  top-0">
      <ul className="flex gap-7 sm:10 text-white font-semibold">
        <li>
          <Link
            href={`/student/courses`}
            className="hover:text-black transition-colors duration-300 ease-in-out"
          >
            Courses
          </Link>
        </li>
        <li>
          <Link
            href={`/student/support`}
            className="hover:text-black transition-colors duration-300 ease-in-out"
          >
            Support
          </Link>
        </li>
        <li>
          <Link
            href={`/student/enrolled-courses`}
            className="hover:text-black transition-colors duration-300 ease-in-out"
          >
            Enrolled Courses
          </Link>
        </li>
        <li>
          <Link
            href={`/student/my-profile`}
            className="hover:text-black transition-colors duration-300 ease-in-out"
          >
            My Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default StudentNavbar;
