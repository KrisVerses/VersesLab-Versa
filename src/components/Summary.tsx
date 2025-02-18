import React, { useContext } from "react";
import { UpcomingTasks } from "./UpcomingTasks";
import { UpcomingAppointment } from "./UpcomingAppointment";
import { RecentNotes } from "./RecentNotes";
import { StateContext } from "../app/StateProvider";

export const Summary: React.FC = () => {
  const { nextAppointment, recentNotes } = useContext(StateContext);

  return (
    <div className="grid grid-cols-3 gap-4 bg-white p-6 shadow-md rounded-lg">
      <UpcomingTasks />
      <UpcomingAppointment />
      <RecentNotes recentNotes={recentNotes} />
    </div>
  );
};
