"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CreateLectureHandler from "@/actions/teacherActions/CreateLectureHandler";
import { verifyCreateLectureForm } from "@/actions/teacherActions/VerifyCreateLectureForm";
import toast from "react-hot-toast";

export default function CreateLectureForm({
  setState,
  courseId,
  onSuccess,
}: {
  setState: (v: boolean) => void;
  courseId: string;
  onSuccess: (lecture: any) => void;
}) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { valid, errors } = verifyCreateLectureForm({
      title,
      startTime,
      endTime,
    });
    if (!valid) {
      errors.forEach((err) => toast.error(err));
      setLoading(false);
      return;
    }
    const result = await CreateLectureHandler({
      courseId,
      title,
      startTime: new Date(startTime),
      endTime: endTime ? new Date(endTime) : undefined,
    });

    if (result) {
      onSuccess(result.lecture);
      setState(false); // close modal
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle>Create New Lecture</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Lecture Title */}
            <div>
              <Label htmlFor="title">Lecture Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter lecture title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Start Time */}
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>

            {/* End Time */}
            <div>
              <Label htmlFor="endTime">End Time (optional)</Label>
              <Input
                id="endTime"
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setState(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
