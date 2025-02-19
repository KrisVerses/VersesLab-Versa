import React, { useContext } from "react";
import { StateContext } from "../app/StateProvider";
import { convertMilitaryToRegular } from "../utils/helpers";

export const UpcomingAppointment: React.FC = () => {
  const { nextAppointment } = useContext(StateContext);
  const isEmpty = !nextAppointment;

  return (
    <div>
      <h3 className="text-lg font-bold">Next Appointment</h3>
      {isEmpty ? (
        <p className="border-r-2 text-gray-500 italic">
          No upcoming appointments.
        </p>
      ) : (
        <div className="border-r-2">
          <p>Title: {nextAppointment.content}</p>
          <div className="flex items-center">
            <p>Date: {nextAppointment.dueDate}</p>
            <p className="mx-2"> | </p>
            <p>Time: {convertMilitaryToRegular(nextAppointment.time)}</p>
          </div>
        </div>
      )}
    </div>
  );
};
