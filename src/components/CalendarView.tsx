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
  const appointmentDates = allAppointments.map((appt) => new Date(appt.date));

  // Function to check if a date has an appointment
  const isAppointmentDay = (date: Date) =>
    appointmentDates.some(
      (apptDate) => apptDate.toDateString() === date.toDateString()
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Calendar View</h2>

      {/* Calendar Component */}
      <div className="bg-white shadow-md p-4 rounded-lg">
        <Calendar
          onChange={(date) => setSelectedDate(date as Date)}
          value={selectedDate}
          tileClassName={({ date }) =>
            isAppointmentDay(date) ? "bg-blue-500 text-white rounded-md" : ""
          }
        />
      </div>
    </div>
  );
};
