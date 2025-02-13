import React from "react";
import { UpcomingTasks } from "./UpcomingTasks";
import { UpcomingAppointment } from "./UpcomingAppointment";
import { RecentNotes } from "./RecentNotes";

export const Summary: React.FC = () => {
  const tasks = [
    { id: 1, description: "Task 1", dueDate: "02/15/25" },
    { id: 2, description: "Task 2", dueDate: "02/16/25" },
  ];

  const appointment = {
    id: 1,
    description: "Meeting with John",
    dueDate: "02/12/25",
    time: "10:00 AM",
  };

  const recentNotes = [
    { id: 1, title: "Reflect on Weekly Wins" },
    { id: 2, title: "Sketch wireframes for new project" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 bg-white p-6 shadow-md rounded-lg">
      <UpcomingTasks tasks={tasks} />
      <UpcomingAppointment appointment={appointment} />
      <RecentNotes recentNotes={recentNotes} />
    </div>
  );
};
