import React, { useContext, useState } from "react";
import { CalendarView } from "../components/CalendarView";
import { StateContext } from "../app/StateProvider";
import { DynamicFormModal } from "../components/DynamicFormModal";
import { Appointment, FormInput } from "../types/types";
import { convertMilitaryToRegular } from "../utils/helpers";

export const Appointments: React.FC = () => {
  const [modalType, setModalType] = useState<"appointment" | null>(null);
  const {
    allAppointments,
    addAppointment,
    editAppointment,
    deleteAppointment,
  } = useContext(StateContext);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);

  const handleAdd = () => {
    setModalType("appointment");
  };

  const handleEdit = (appt: Appointment) => {
    setSelectedAppt(appt);
    setModalType("appointment");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 border-b-2 p-4">Appointments</h1>
      <div className="w-full text-center">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
          onClick={handleAdd}
        >
          + Add New Appointment
        </button>
      </div>
      {/* Calendar View Component */}
      <CalendarView
        allAppointments={allAppointments}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* Upcoming Appointments */}
      <div className="max-w-3xl mx-auto mt-6">
        <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
        <div className="border-t mt-2 pt-2 w-full">
          {allAppointments.length > 0 ? (
            allAppointments.map((appt: any) => (
              <div
                key={appt.id}
                className="p-4 bg-gray-100 rounded-md shadow-md mb-2"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{appt.description}</p>
                    <p className="text-sm text-gray-600">
                      {appt.dueDate} | {convertMilitaryToRegular(appt.time)}
                    </p>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => handleEdit(appt)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => deleteAppointment(appt.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No upcoming appointments.</p>
          )}
        </div>
      </div>
      {modalType === "appointment" && (
        <DynamicFormModal
          formType="appointment"
          initialData={selectedAppt ? selectedAppt : undefined}
          onClose={() => {
            setModalType(null);
            setSelectedAppt(null);
          }}
          onSave={(updatedData: FormInput) => {
            if (!updatedData) return;
            if (updatedData.type === "appointment" && selectedAppt) {
              editAppointment(updatedData);
            } else {
              addAppointment(updatedData);
            }
            setModalType(null);
          }}
        />
      )}
    </div>
  );
};
