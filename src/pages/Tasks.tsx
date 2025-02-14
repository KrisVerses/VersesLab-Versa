import React, { useContext, useState } from "react";
import { StateContext } from "../app/StateProvider";
import { Task } from "../types/types";
import { DynamicFormModal } from "../components/DynamicFormModal";

export const Tasks: React.FC = () => {
  const { allTasks, setAllTasks, editTask, toggleTaskCompletion } =
    useContext(StateContext);

  const [modalType, setModalType] = useState<"task" | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setModalType("task");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 border-b-2 p-4">Tasks</h1>
      <button className="border px-4 py-2 rounded-full">+ Add New Task</button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allTasks.map((task: Task) => (
          <div key={task.id} className="bg-gray-100 p-4 rounded-md shadow-md">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <p
                  className={task.completed ? "line-through text-gray-500" : ""}
                >
                  {task.description}
                </p>
              </div>
              <p className="text-gray-600">Due: {task.dueDate}</p>
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleEdit(task)}
              >
                Edit
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {modalType === "task" && (
        <DynamicFormModal
          formType="task"
          initialData={selectedTask} // Prefill with the selected task
          onClose={() => {
            setModalType(null);
            setSelectedTask(null);
          }}
          onSave={(updatedTask: Task) => {
            editTask(updatedTask);
            setModalType(null);
            setSelectedTask(null);
          }}
        />
      )}
      {/* Edit / Delete Buttons */}
      <div className="flex my-4">
        <div className="flex items-center mx-4">
          <p className="mr-4">Filter Options: </p>
          <select className="rounded-lg py-1 px-2">
            <option>All</option>
            <option>Completed</option>
            <option>Incomplete</option>
          </select>
        </div>
        <div className="flex items-center mx-4">
          <p className="mr-2">Sort By: </p>
          <select className="rounded-lg py-1 px-2">
            <option>Due Date</option>
            <option>Priority</option>
            <option>Recently Added</option>
          </select>
        </div>
      </div>
    </div>
  );
};
