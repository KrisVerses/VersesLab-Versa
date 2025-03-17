import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default styles
import { CalendarViewProps } from "../types/types";
import { motion } from "framer-motion";

export const CalendarView: React.FC<CalendarViewProps> = ({
  allAppointments,
  setSelectedDate,
  selectedDate,
}) => {
  // Convert string dates in appointments to Date objects for matching
  const appointmentDates = allAppointments.map(
    (appt) => new Date(appt.dueDate)
  );

  const getTileClassName = ({ date }: { date: Date }) => {
    const formattedDate = date.toISOString().split("T")[0];
    const appointmentCount = allAppointments.filter(
      (appt) => appt.dueDate === formattedDate
    ).length;

    const baseClasses = "rounded-lg transition-colors";
    
    if (appointmentCount > 2) {
      return `${baseClasses} !bg-gradient-to-r from-purple-500 to-indigo-500 !text-white hover:from-purple-600 hover:to-indigo-600`;
    }
    if (appointmentCount > 0) {
      return `${baseClasses} !bg-purple-100 !text-purple-700 hover:!bg-purple-200`;
    }
    return baseClasses;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Calendar View</h2>
      <Calendar
        onChange={(date) => setSelectedDate(date as Date)}
        value={selectedDate}
        tileClassName={getTileClassName}
        className="border-0 shadow-none w-full"
        tileContent={({ date }) => {
          const formattedDate = date.toISOString().split("T")[0];
          const appointmentCount = allAppointments.filter(
            (appt) => appt.dueDate === formattedDate
          ).length;
          
          return appointmentCount > 0 ? (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-0.5">
                {[...Array(Math.min(appointmentCount, 3))].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 h-1 rounded-full bg-current opacity-75"
                  />
                ))}
              </div>
            </div>
          ) : null;
        }}
      />
    </motion.div>
  );
};
