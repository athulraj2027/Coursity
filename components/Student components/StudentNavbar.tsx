"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const StudentNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-white text-gray-600 border border-t-gray-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-end sm:justify-center items-center h-12">
          {/* Desktop Menu */}
          <ul className="hidden sm:flex gap-7">
            <li>
              <Link
                href={`/student/courses`}
                className="hover:text-gray-300 transition-colors duration-300 ease-in-out"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                href={`/student/support`}
                className="hover:text-gray-300 transition-colors duration-300 ease-in-out"
              >
                Support
              </Link>
            </li>
            <li>
              <Link
                href={`/student/my-learning`}
                className="hover:text-gray-300 transition-colors duration-300 ease-in-out"
              >
                My Learning
              </Link>
            </li>
            <li>
              <Link
                href={`/student/my-profile`}
                className="hover:text-gray-300 transition-colors duration-300 ease-in-out"
              >
                My Profile
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="sm:hidden transition-transform ease-in-out focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="sm:hidden bg-white border-t border-gray-700">
          <ul className="flex flex-col gap-4 p-4">
            <li>
              <Link href={`/student/courses`} onClick={toggleMenu}>
                Courses
              </Link>
            </li>
            <li>
              <Link href={`/student/support`} onClick={toggleMenu}>
                Support
              </Link>
            </li>
            <li>
              <Link href={`/student/enrolled-courses`} onClick={toggleMenu}>
                Enrolled Courses
              </Link>
            </li>
            <li>
              <Link href={`/student/my-profile`} onClick={toggleMenu}>
                My Profile
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default StudentNavbar;
