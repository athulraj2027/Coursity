import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import ConfirmationCard from "../ConfirmationCard";
import CreateCourseHandler from "@/actions/teacherActions/CreateCourseHandler";

interface CourseFormData {
  name: string;
  description: string;
  price: string;
  startDate: string;
  noOfClasses: string;
  totalHours: string;
}
const CreateCourseForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [noOfClasses, setNoOfClasses] = useState("");
  const [totalHours, setTotalHours] = useState("");
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [data, setData] = useState<CourseFormData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData: CourseFormData = {
      name,
      description,
      price,
      startDate,
      noOfClasses,
      totalHours,
    };
    setData(formData);

    setIsConfirmationVisible(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 sm:p-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create New Course
        </h2>
        <form
          noValidate
          onSubmit={handleSubmit}
          className="grid gap-6 sm:grid-cols-2"
        >
          {/* Course Title */}
          <div className="flex flex-col">
            <Label className="mb-3">Course Title</Label>
            <Input
              placeholder="Web Development"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <Label className="mb-3">Price (₹)</Label>
            <Input
              type="number"
              placeholder="e.g. 4999"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Start Date */}
          <div className="flex flex-col">
            <Label className="mb-3">Start Date</Label>
            <Input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          {/* No of Classes */}
          <div className="flex flex-col">
            <Label className="mb-3">Number of Classes</Label>
            <Input
              type="number"
              placeholder="e.g. 12"
              required
              value={noOfClasses}
              onChange={(e) => setNoOfClasses(e.target.value)}
            />
          </div>

          {/* Total Hours */}
          <div className="flex flex-col">
            <Label className="mb-3">Total Hours</Label>
            <Input
              type="number"
              placeholder="e.g. 48"
              required
              value={totalHours}
              onChange={(e) => setTotalHours(e.target.value)}
            />
          </div>

          {/* Description (full width) */}
          <div className="flex flex-col sm:col-span-2">
            <Label className="mb-3">Description</Label>
            <textarea
              placeholder="Write a short description..."
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-[120px] w-full border border-gray-300 dark:border-gray-700 rounded-md p-3 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2 flex justify-end">
            <Button type="submit" className="w-full sm:w-auto">
              Create Course
            </Button>
          </div>
        </form>
      </div>
      {isConfirmationVisible && (
        <ConfirmationCard<CourseFormData>
          onConfirm={CreateCourseHandler}
          setIsConfirmationVisible={setIsConfirmationVisible}
          question={`Are you sure to create this course ?`}
          data={data}
        />
      )}
    </div>
  );
};

export default CreateCourseForm;
