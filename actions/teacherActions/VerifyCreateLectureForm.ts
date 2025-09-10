export function verifyCreateLectureForm({
  title,
  startTime,
  endTime,
}: {
  title: string;
  startTime: string; // datetime-local value
  endTime?: string; // optional
}) {
  const errors: string[] = [];

  // Title check
  if (!title || title.trim().length < 3) {
    errors.push("Title must be at least 3 characters long");
  }

  // Start time check
  if (!startTime) {
    errors.push("Start time is required");
  } else if (isNaN(Date.parse(startTime))) {
    errors.push("Invalid start time format");
  }

  // End time check
  if (endTime) {
    if (isNaN(Date.parse(endTime))) {
      errors.push("Invalid end time format");
    } else if (new Date(endTime) <= new Date(startTime)) {
      errors.push("End time must be after start time");
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
