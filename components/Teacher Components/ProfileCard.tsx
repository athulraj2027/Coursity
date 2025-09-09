import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const ProfileCard = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 sm:p-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
        <div className="grid grid-cols-3 gap-2 sm:gap-6">
          {/* Name */}
          <div className="flex items-center">
            <Label>Name</Label>
          </div>
          <div className="col-span-2">
            <Input value="John Doe" disabled />
          </div>

          {/* Experience */}
          <div className="flex items-center">
            <Label>Experience</Label>
          </div>
          <div className="col-span-2">
            <Input value="5 years" disabled />
          </div>

          {/* Email */}
          <div className="flex items-center">
            <Label>Email</Label>
          </div>
          <div className="col-span-2">
            <Input value="john@example.com" disabled />
          </div>

          {/* Subjects */}
          <div className="flex items-center">
            <Label>Subjects</Label>
          </div>
          <div className="col-span-2">
            <Input value="Web Development, DSA" disabled />
          </div>

          {/* Qualification */}
          <div className="flex items-center">
            <Label>Qualification</Label>
          </div>
          <div className="col-span-2">
            <Input value="M.Tech in Computer Science" disabled />
          </div>

          {/* Languages */}
          <div className="flex items-center">
            <Label>Languages</Label>
          </div>
          <div className="col-span-2">
            <Input value="English, Hindi" disabled />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
