import React from "react";
import { Appointment } from "../types/types";

type UpcomingAppointmentProps = {
  appointment: Appointment;
};

export const UpcomingAppointment: React.FC<UpcomingAppointmentProps> = ({
  appointment,
}) => {
  return (
    <div className="border-r-2">
      <h3 className="text-lg font-bold">Next Appointment</h3>
      <p>Title: {appointment.description}</p>
      <div className="flex">
        <p>Date: {appointment.dueDate}</p>
        <p className="mx-2"> | </p>
        <p>Time: {appointment.time}</p>
      </div>
    </div>
  );
};
