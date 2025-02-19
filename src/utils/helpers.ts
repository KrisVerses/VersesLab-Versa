import { Appointment, Task } from "../types/types";

export const isEqual = (obj1: Task | Appointment, obj2: Task | Appointment) => {
  return (
    obj1.id === obj2.id &&
    obj1.description === obj2.description &&
    obj1.dueDate === obj2.dueDate
  );
};

export const convertMilitaryToRegular = (time: string): string => {
  const [hours, minutes] = time.split(":").map(Number); // Split "HH:MM" and convert to numbers
  const period = hours >= 12 ? "PM" : "AM"; // Determine AM or PM
  const formattedHours = hours % 12 || 12; // Convert 0 or 12 to 12, and 13-23 to 1-11
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export function getSnippet(text: string, maxLength: number = 60): string {
  if (text.length <= maxLength) return text; // If the text is short enough, return it as is.

  // Find the last space within the maxLength limit
  let trimmedText = text.substring(0, maxLength);
  let lastSpaceIndex = trimmedText.lastIndexOf(" ");

  // Ensure we don't cut in the middle of a word
  if (lastSpaceIndex > 0) {
    trimmedText = trimmedText.substring(0, lastSpaceIndex);
  }

  return trimmedText + "...";
}
