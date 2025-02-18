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
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to Versa!</h1>
      <Summary />
      <QuickActions changeModalType={setModalType} />
      {modalType && (
        <DynamicFormModal
          formType={modalType}
          onClose={() => setModalType(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
