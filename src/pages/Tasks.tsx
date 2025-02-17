import React, { useContext, useState } from "react";
import { StateContext } from "../app/StateProvider";
import { FormInput, Task } from "../types/types";
import { DynamicFormModal } from "../components/DynamicFormModal";

export const Tasks: React.FC = () => {
  const {
    addTask,
    editTask,
    deleteTask,
    allTasks,
    toggleTaskCompletion,
    filter,
    sortBy,
    setFilter,
    handleSortByChange,
    filteredTasks,
  } = useContext(StateContext);

  const [modalType, setModalType] = useState<"task" | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setModalType("task");
  };

  const handleAdd = () => {
    setSelectedTask(null);
    setModalType("task");
  };

  // Filter / Sort Options
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  const tasks = filteredTasks();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 border-b-2 p-4">Tasks</h1>
      <button className="border px-4 py-2 rounded-full" onClick={handleAdd}>
        + Add New Task
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.length > 0 ? (
          tasks?.map((task: Task) => (
            <div key={task.id} className="bg-gray-100 p-4 rounded-md shadow-md">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(task.id)}
                  />
                  <p
                    className={
                      task.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    {task.description}
                  </p>
                </div>
                <p className="text-gray-600">Due: {task.dueDate}</p>
              </div>

              <div className="flex items-center justify-between">
                {/* Edit / Delete Buttons */}
                <div className="mt-4 flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
                <div className="">
                  <p
                    className={`border-2 border-gray-300 px-4 py-2 rounded-full ${
                      task.priority === "High"
                        ? "bg-red-600 text-white"
                        : task.priority === "Medium"
                        ? "bg-yellow-300"
                        : "bg-green-400"
                    }`}
                  >
                    {task.priority}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : allTasks.length > 0 ? (
          <p>
            No tasks match the selected filter and sort criteria. Try adjusting
            your filters or adding a new task.
          </p>
        ) : (
          <p>
            There are no Tasks currently. Click 'Add New Task' to get started!
          </p>
        )}
      </div>
      {modalType === "task" && (
        <DynamicFormModal
          formType="task"
          initialData={!selectedTask ? undefined : selectedTask} // Prefill with the selected task
          onClose={() => {
            setModalType(null);
            setSelectedTask(null);
          }}
          onSave={(updatedData: FormInput) => {
            if (!updatedData) return;
            if (updatedData.type === "task" && selectedTask) {
              editTask(updatedData);
            } else {
              addTask(updatedData);
            }
            setModalType(null);
            setSelectedTask(null);
          }}
        />
      )}

      {/* Filter / Sort Options */}
      <div className="flex my-4">
        <div className="flex items-center mx-4">
          <p className="mr-4">Filter Options: </p>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="rounded-lg py-1 px-2"
          >
            <option value={"All"}>All</option>
            <option value={"Completed"}>Completed</option>
            <option value={"Incompleted"}>Incomplete</option>
          </select>
        </div>
        <div className="flex items-center mx-4">
          <p className="mr-2">Sort By: </p>
          <select
            onChange={handleSortByChange}
            value={sortBy}
            className="rounded-lg py-1 px-2"
          >
            <option value={"Due Date"}>Due Date</option>
            <option value={"Recently"}>Recently Added</option>
            <option value={"Priority"}>Priority</option>
          </select>
        </div>
      </div>
    </div>
  );
};
