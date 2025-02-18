import React, { useState, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles
import { CalendarViewProps } from "../types/types";

export const CalendarView: React.FC<CalendarViewProps> = ({
  allAppointments,
  setSelectedDate,
  selectedDate,
}) => {
  // Convert string dates in appointments to Date objects for matching
  const appointmentDates = allAppointments.map(
    (appt) => new Date(appt.dueDate)
  );

  const getTileClassName = (date: Date) => {
    const formattedDate = date.toISOString().split("T")[0]; // Format YYYY-MM-DD
    const appointmentCount = allAppointments.filter(
      (appt) => appt.dueDate === formattedDate
    ).length;

    if (appointmentCount > 2) return "bg-red-500 text-white"; // Many appointments
    if (appointmentCount > 0) return "bg-yellow-300"; // Some appointments
    return ""; // No appointments
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Calendar View</h2>

      {/* Calendar Component */}
      <div className="bg-white shadow-md p-4 rounded-lg">
        <Calendar
          onClickDay={(date) => setSelectedDate(date)}
          onChange={(date) => setSelectedDate(date as Date)}
          value={selectedDate}
          tileClassName={({ date }) => getTileClassName(date)}
        />
      </div>
    </div>
  );
};
