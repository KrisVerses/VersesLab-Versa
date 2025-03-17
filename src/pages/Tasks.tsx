import React, { useState, useContext } from "react";
import { StateContext } from "../app/StateProvider";
import { DynamicFormModal } from "../components/DynamicFormModal";
import { Task, FormInput } from "../types/types";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export const Tasks: React.FC = () => {
  const context = useContext(StateContext);
  if (!context) throw new Error("Tasks must be used within a StateProvider");
  
  const { tasks, addTask, updateTask, deleteTask } = context;
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [sortBy, setSortBy] = useState<"date" | "priority">("date");

  const handleSave = (data: FormInput) => {
    if (data.type !== "task") return;
    const taskData = data as Task;
    
    if (editingTask) {
      updateTask({ ...taskData, id: editingTask.id });
    } else {
      addTask(taskData);
    }
    setShowModal(false);
    setEditingTask(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredTasks = tasks
    .filter((task: Task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .sort((a: Task, b: Task) => {
      if (sortBy === "date") {
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      }
      return b.priority.localeCompare(a.priority);
    });

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tasks
            </h1>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
            >
              <PlusIcon className="w-5 h-5" />
              Add Task
            </button>
          </div>

          <div className="flex gap-4 flex-wrap">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as "all" | "completed" | "pending")}
              className="px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "priority")}
              className="px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </div>

          <div className="grid gap-4">
            {filteredTasks.map((task: Task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => updateTask({ ...task, completed: !task.completed })}
                      className="w-5 h-5 rounded-md border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                    <div>
                      <h3 className={`text-lg font-medium ${task.completed ? "line-through text-gray-400" : ""}`}>
                        {task.description}
                      </h3>
                      <div className="flex gap-4 mt-2">
                        <span className={`text-sm ${getPriorityColor(task.priority)}`}>
                          {task.priority} Priority
                        </span>
                        <span className="text-sm text-gray-500">
                          Due: {formatDate(task.dueDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingTask(task);
                        setShowModal(true);
                      }}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <PencilIcon className="w-5 h-5 text-gray-500" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <TrashIcon className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {showModal && (
          <DynamicFormModal
            formType="task"
            onClose={() => {
              setShowModal(false);
              setEditingTask(null);
            }}
            onSave={handleSave}
            initialData={editingTask || undefined}
          />
        )}
      </div>
    </div>
  );
};
