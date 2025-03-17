import React, { useState, useContext } from "react";
import { DynamicFormModal } from "../components/DynamicFormModal";
import { StateContext } from "../app/StateProvider";
import { Task, Appointment, Note } from "../types/types";
import { Summary } from "../components/Summary";
import { QuickActions } from "../components/QuickActions";

export const Home: React.FC = () => {
  const { addTask, updateAppointment, addNote } = useContext(StateContext);
  const [modalType, setModalType] = useState<
    "task" | "appointment" | "note" | null
  >(null);

  const handleSave = (data: Task | Appointment | Note) => {
    console.log("saving data...");
    console.log(data);
    if (modalType === "task") addTask(data as Task);
    if (modalType === "appointment") updateAppointment(data as Appointment);
    if (modalType === "note") addNote(data as Note);
  };

  // Function to format date strings into YYYY-MM-DD format for date input fields
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Summary />
        {/* <QuickActions changeModalType={setModalType} /> */}
        {modalType && (
          <DynamicFormModal
            formType={modalType}
            onClose={() => setModalType(null)}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};
