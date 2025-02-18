import React, { useContext } from "react";
import { StateContext } from "../app/StateProvider";

export const UpcomingAppointment: React.FC = () => {
  const { nextAppointment } = useContext(StateContext);
  const isEmpty = !nextAppointment || Object.keys(nextAppointment).length === 0;

  return isEmpty ? (
    <p className="text-gray-500 italic">No upcoming appointments.</p>
  ) : (
    <div className="border-r-2 p-4">
      <h3 className="text-lg font-bold">Next Appointment</h3>
      <p>Title: {nextAppointment.description}</p>
      <div className="flex items-center">
        <p>Date: {nextAppointment.dueDate}</p>
        <p className="mx-2"> | </p>
        <p>Time: {nextAppointment.time}</p>
      </div>
    </div>
  );
};
