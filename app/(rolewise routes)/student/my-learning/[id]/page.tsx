"use client";

import { fetchLearningHandler } from "@/actions/studentActions";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function MyLearningPage() {
  const { id } = useParams();

  useEffect(() => {
    fetchLearningHandler(id);
  }, [id]);
  return;
}
