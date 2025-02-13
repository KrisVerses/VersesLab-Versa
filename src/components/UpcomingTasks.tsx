import React from "react";
import { Task } from "../types/types";

type UpcomingTasksProps = {
  tasks: Task[];
};

export const UpcomingTasks: React.FC<UpcomingTasksProps> = ({ tasks }) => {
  return (
    <div className="border-r-2">
      <h3 className="text-lg font-bold ">Upcoming Tasks</h3>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            [ ] {task.description} (Due: {task.dueDate})
          </li>
        ))}
      </ul>
    </div>
  );
};
