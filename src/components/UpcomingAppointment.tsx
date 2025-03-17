import React, { useContext } from "react";
import { StateContext } from "../app/StateProvider";
import { motion } from "framer-motion";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";

export const UpcomingAppointment: React.FC = () => {
  const context = useContext(StateContext);
  
  if (!context) {
    return null;
  }

  const { appointments } = context;
  
  const createLocalDate = (dateStr: string, timeStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    // Create date in local timezone
    const date = new Date(year, month - 1, day);
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // Get the next upcoming appointment
  const now = new Date();
  const nextAppointment = appointments
    .filter(appt => {
      const apptDate = createLocalDate(appt.dueDate, appt.time);
      return apptDate > now;
    })
    .sort((a, b) => {
      const dateA = createLocalDate(a.dueDate, a.time);
      const dateB = createLocalDate(b.dueDate, b.time);
      return dateA.getTime() - dateB.getTime();
    })[0];

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-4">
      {nextAppointment ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <h4 className="font-medium text-gray-800 mb-3">{nextAppointment.description}</h4>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-gray-600">
              <CalendarIcon className="w-4 h-4" />
              <span className="text-sm">
                {formatDate(nextAppointment.dueDate)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <ClockIcon className="w-4 h-4" />
              <span className="text-sm">
                {formatTime(nextAppointment.time)}
              </span>
            </div>
          </div>
        </motion.div>
      ) : (
        <p className="text-gray-500 italic text-center py-4">
          No upcoming appointments
        </p>
      )}
    </div>
  );
};
