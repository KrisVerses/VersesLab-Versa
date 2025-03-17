import React from "react";
import { QuickActionsProps } from "../types/types";

export const QuickActions: React.FC<QuickActionsProps> = ({
  changeModalType,
}) => {
  return (
    <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
      <button
        className="group relative w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg 
        shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 
        hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => changeModalType("task")}
      >
        <div className="flex items-center justify-center space-x-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>New Task</span>
        </div>
        <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
      </button>

      <button
        className="group relative w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg 
        shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 
        hover:from-purple-700 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        onClick={() => changeModalType("appointment")}
      >
        <div className="flex items-center justify-center space-x-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>New Meeting</span>
        </div>
        <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
      </button>

      <button
        className="group relative w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg 
        shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 
        hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        onClick={() => changeModalType("note")}
      >
        <div className="flex items-center justify-center space-x-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>New Note</span>
        </div>
        <div className="absolute inset-0 rounded-lg bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></div>
      </button>
    </div>
  );
};
