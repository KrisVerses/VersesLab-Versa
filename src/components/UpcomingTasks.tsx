import React, { useContext } from "react";
import { StateContext } from "../app/StateProvider";
import { Task } from "../types/types";

export const UpcomingTasks: React.FC = () => {
  const { toggleTaskCompletion, filteredTasks } = useContext(StateContext);

  const tasks = filteredTasks().slice(0, 3);
  return (
    <div className="border-r-2">
      <h3 className="text-lg font-bold ">Upcoming Tasks</h3>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task: Task) => (
            <li key={task.id}>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <p
                  className={task.completed ? "line-through text-gray-500" : ""}
                >
                  {task.description} (Due: {task.dueDate})
                </p>
              </div>
            </li>
          ))
        ) : (
          <p>No upcoming tasks</p>
        )}
      </ul>
    </div>
  );
};
