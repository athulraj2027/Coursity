"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { fetchCourseHandler } from "@/actions/studentActions";

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

export default function CheckoutPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
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
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 sm:p-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>

        {/* Course Summary */}
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {course.description}
          </p>
          <div className="mt-3 grid grid-cols-2 text-sm gap-y-1">
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
              <span className="font-medium">Teacher:</span>{" "}
              {course.teacher.user.username}
            </p>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Course Price</span>
            <span>₹ {course.price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>GST (18%)</span>
            <span>₹ {(course.price * 0.18).toFixed(0)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>Total</span>
            <span>₹ {(course.price * 1.18).toFixed(0)}</span>
          </div>
        </div>

        {/* Payment Button */}
        <div className="mt-6">
          <Button className="w-full text-lg py-6" disabled={loading}>
            {loading ? "Processing..." : "Proceed to Pay with Razorpay"}
          </Button>
        </div>

        {/* Note */}
        <p className="text-xs text-gray-500 text-center mt-4">
          By proceeding, you agree to our Terms of Service and Refund Policy.
        </p>
      </div>
    </div>
  );
}
