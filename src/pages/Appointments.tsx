import React, { useContext, useState } from "react";
import { CalendarView } from "../components/CalendarView";
import { StateContext } from "../app/StateProvider";
import { DynamicFormModal } from "../components/DynamicFormModal";
import { FormInput } from "../types/types";

export const Appointments: React.FC = () => {
  const [modalType, setModalType] = useState<"appointment" | null>(null);
  const { allAppointments, addAppointment } = useContext(StateContext);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleAdd = () => {
    setModalType("appointment");
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 border-b-2 p-4">Appointments</h1>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        onClick={handleAdd}
      >
        + Add New Appointment
      </button>

      {/* Calendar View Component */}
      <CalendarView
        allAppointments={allAppointments}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {modalType === "appointment" && (
        <DynamicFormModal
          formType="appointment"
          onClose={() => {
            setModalType(null);
          }}
          onSave={(updatedData: FormInput) => {
            if (!updatedData) return;
            if (updatedData.type === "appointment") {
              addAppointment(updatedData);
            }
            setModalType(null);
          }}
        />
      )}

      {/* Upcoming Appointments */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
        <div className="border-t mt-2 pt-2">
          {allAppointments.length > 0 ? (
            allAppointments.map((appt: any) => (
              <div
                key={appt.id}
                className="p-4 bg-gray-100 rounded-md shadow-md mb-2 flex justify-between"
              >
                <div>
                  <p className="font-bold">{appt.description}</p>
                  <p className="text-sm text-gray-600">
                    {appt.dueDate} | {appt.time}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No upcoming appointments.</p>
          )}
        </div>
      </div>
    </div>
  );
};
