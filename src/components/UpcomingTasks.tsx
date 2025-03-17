import React, { useContext } from "react";
import { StateContext } from "../app/StateProvider";
import { Task } from "../types/types";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export const UpcomingTasks: React.FC = () => {
  const context = useContext(StateContext);
  
  if (!context) {
    return null;
  }

  const { toggleTaskCompletion, filteredTasks } = context;
  const tasks = filteredTasks().slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {tasks.length > 0 ? (
        <motion.ul className="space-y-3">
          {tasks.map((task: Task) => (
            <motion.li
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <button
                onClick={() => toggleTaskCompletion(task.id)}
                className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-colors
                  ${task.completed 
                    ? 'border-blue-500 bg-blue-500 text-white' 
                    : 'border-gray-300 hover:border-blue-500'
                  }`}
              >
                {task.completed && (
                  <CheckCircleIcon className="w-4 h-4" />
                )}
              </button>
              <div className="flex-grow min-w-0">
                <p className={`text-sm font-medium truncate ${
                  task.completed ? "line-through text-gray-400" : "text-gray-700"
                }`}>
                  {task.description}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs ${
                    task.completed ? "text-gray-400" : "text-gray-500"
                  }`}>
                    Due: {formatDate(task.dueDate)}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    task.priority === "High" 
                      ? "bg-red-100 text-red-700"
                      : task.priority === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <p className="text-gray-500 italic text-center py-4">No upcoming tasks</p>
      )}
    </div>
  );
};
