"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const TeacherNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-black text-white font-semibold">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-end sm:justify-center  items-center h-12">
          {/* Desktop Menu */}
          <ul className="hidden sm:flex gap-7">
            <li>
              <Link
                href={`/teacher`}
                className="hover:text-gray-300 transition-colors duration-300 ease-in-out"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={`/teacher/my-courses`}
                className="hover:text-gray-300 transition-colors duration-300 ease-in-out"
              >
                My Courses
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
                href={`/teacher/upcoming-classes`}
                className="hover:text-gray-300 transition-colors duration-300 ease-in-out"
              >
                Upcoming Classes
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
        <div className="sm:hidden bg-black border-t border-gray-700 ">
          <ul className="flex flex-col gap-4 p-4">
            <li>
              <Link href={`/teacher`} onClick={toggleMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href={`/teacher/my-courses`} onClick={toggleMenu}>
                My Courses
              </Link>
            </li>
            <li>
              <Link href={`/teacher/new-course`} onClick={toggleMenu}>
                Create New Course
              </Link>
            </li>
            <li>
              <Link href={`/teacher/support`} onClick={toggleMenu}>
                Support
              </Link>
            </li>
            <li>
              <Link href={`/teacher/upcoming-classes`} onClick={toggleMenu}>
                Upcoming Classes
              </Link>
            </li>
            <li>
              <Link href={`/teacher/my-profile`} onClick={toggleMenu}>
                My Profile
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default TeacherNavbar;
