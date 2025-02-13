import React from "react";

type QuickActionsProps = {
  changeModalType: React.Dispatch<
    React.SetStateAction<"task" | "appointment" | "note" | null>
  >;
};

export const QuickActions: React.FC<QuickActionsProps> = ({
  changeModalType,
}) => {
  return (
    <div className="mt-4 flex justify-center gap-4">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => changeModalType("task")}
      >
        + New Task
      </button>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => changeModalType("appointment")}
      >
        + New Appointment
      </button>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => changeModalType("note")}
      >
        + New Note
      </button>
    </div>
  );
};
