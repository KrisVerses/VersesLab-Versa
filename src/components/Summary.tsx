import React, { useContext, useState } from "react";
import { UpcomingTasks } from "./UpcomingTasks";
import { UpcomingAppointment } from "./UpcomingAppointment";
import { RecentNotes } from "./RecentNotes";
import { StateContext } from "../app/StateProvider";
import { DynamicFormModal } from "./DynamicFormModal";
import { FormInput } from "../types/types";

export const Summary: React.FC = () => {
  const { addTask, updateAppointment, addNote } = useContext(StateContext);
  const [modalType, setModalType] = useState<"task" | "appointment" | "note" | null>(null);

  const handleSave = (data: FormInput) => {
    if (!data) return;
    
    if (data.type === "task") addTask(data);
    if (data.type === "appointment") updateAppointment(data);
    if (data.type === "note") addNote(data);
    
    setModalType(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Versa Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay organized and focused with your tasks, appointments, and notes all in one place.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tasks Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-[1.02]">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Upcoming Tasks</h2>
                <div className="h-1 w-20 bg-blue-500 rounded"></div>
              </div>
              <UpcomingTasks />
            </div>

            {/* Appointments Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-[1.02]">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Appointments</h2>
                <div className="h-1 w-20 bg-purple-500 rounded"></div>
              </div>
              <UpcomingAppointment />
            </div>

            {/* Notes Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-[1.02]">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Recent Notes</h2>
                <div className="h-1 w-20 bg-green-500 rounded"></div>
              </div>
              <RecentNotes />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 flex justify-center space-x-4">
          <button 
            onClick={() => setModalType("task")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Add New Task
          </button>
          <button 
            onClick={() => setModalType("appointment")}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
          >
            Schedule Meeting
          </button>
          <button 
            onClick={() => setModalType("note")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
          >
            Create Note
          </button>
        </div>
      </div>

      {/* Modal */}
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
