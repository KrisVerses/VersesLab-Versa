import React from "react";

export const QuickActions: React.FC = () => {
  return (
    <div className="mt-4 flex justify-center gap-4">
      <button className="bg-blue-500 text-white py-2 px-4 rounded">
        New Task
      </button>
      <button className="bg-blue-500 text-white py-2 px-4 rounded">
        New Appointment
      </button>
    </div>
  );
};
