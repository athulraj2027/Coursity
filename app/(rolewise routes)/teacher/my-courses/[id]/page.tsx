"use client";

import fetchCourseHandler from "@/actions/teacherActions/fetchCourseHandler";
import CreateLectureForm from "@/components/Teacher Components/CreateLectureForm";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

export default function MyCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [isFormVisible, setIsFormVisible] = useState(false);

  //   const createLecture = async () => {
  //     await CreateLectureHandler();
  //   };

  useEffect(() => {
    const fetchCourseDetails = async (id: string) => {
      fetchCourseHandler(id);
    };
    fetchCourseDetails(id);
  }, [id]);
  return (
    <div>
      <h1>Course Details</h1>
      <p>Course ID: {id} </p>
      <Button onClick={() => setIsFormVisible(true)}>Create new lecture</Button>
      {isFormVisible && (
        <CreateLectureForm courseId={id} setState={setIsFormVisible} />
      )}
    </div>
  );
}
