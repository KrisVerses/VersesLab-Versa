import React, { useContext, useState } from "react";
import { DynamicFormModalProps, FormInput, Task, Appointment, Note } from "../types/types";

type FormDataType = {
  id?: number;
  type?: "task" | "appointment" | "note";
  description?: string;
  content?: string;
  dueDate?: string;
  completed?: boolean;
  priority?: string;
  time?: string;
  title?: string;
};

export const DynamicFormModal: React.FC<DynamicFormModalProps> = ({
  formType,
  initialData = {},
  onClose,
  onSave,
}) => {
  // Function to format date strings into YYYY-MM-DD format for date input fields
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Initialize formData state with formatted dueDate for input compatibility
  const [formData, setFormData] = useState<FormDataType>({
    id: initialData?.id || Date.now(),
    type: formType,
    description: (initialData as Task | Appointment)?.description || "",
    content: (initialData as Note)?.content || "",
    dueDate: formatDateForInput((initialData as Task | Appointment)?.dueDate || ""), // Format dueDate for input
    completed: (initialData as Task)?.completed ?? false,
    priority: (initialData as Task)?.priority || "",
    time: (initialData as Appointment)?.time || "",
    title: (initialData as Note)?.title || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const baseData = {
      id: formData.id || Date.now(),
      type: formType,
    };

    let formattedData: FormInput;
    switch (formType) {
      case "task":
        formattedData = {
          ...baseData,
          type: "task",
          description: formData.description || "",
          dueDate: formData.dueDate || "",
          completed: formData.completed ?? false,
          priority: formData.priority || "Medium",
        } as Task;
        break;
      case "appointment":
        formattedData = {
          ...baseData,
          type: "appointment",
          description: formData.description || "",
          dueDate: formData.dueDate || "",
          time: formData.time || "00:00",
          completed: false,
        } as Appointment;
        break;
      case "note":
        formattedData = {
          ...baseData,
          type: "note",
          title: formData.title || "",
          content: formData.content || "",
        } as Note;
        break;
      default:
        return;
    }

    onSave(formattedData);
    onClose();
  };

  const getFormColor = () => {
    switch (formType) {
      case "task":
        return "blue";
      case "appointment":
        return "purple";
      case "note":
        return "green";
      default:
        return "blue";
    }
  };

  const color = getFormColor();

  const inputClassName = `w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${color}-500 focus:border-transparent
    placeholder-gray-400 transition-all duration-200`;

  const renderFields = () => {
    switch (formType) {
      case "task":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Description</label>
              <input
                type="text"
                name="description"
                placeholder="What needs to be done?"
                className={inputClassName}
                value={formData.description || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                name="dueDate"
                className={inputClassName}
                value={formData.dueDate || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
              <select
                className={inputClassName}
                name="priority"
                value={formData.priority || "Select Priority"}
                onChange={handleChange}
              >
                <option disabled value="Select Priority">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        );
      case "appointment":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Title</label>
              <input
                type="text"
                name="description"
                value={formData.description || ""}
                placeholder="What's the meeting about?"
                className={inputClassName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate || ""}
                className={inputClassName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time || ""}
                className={inputClassName}
                onChange={handleChange}
              />
            </div>
          </div>
        );
      case "note":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Note Title</label>
              <input
                type="text"
                name="title"
                placeholder="Give your note a title"
                value={formData.title || ""}
                className={inputClassName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                name="content"
                placeholder="Write your thoughts here..."
                value={formData.content || ""}
                className={`${inputClassName} h-32 resize-none`}
                onChange={handleChange}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isEmpty = !initialData || Object.keys(initialData).length === 0;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full m-4 transform transition-all">
        <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r from-${color}-600 to-${color}-400`}></div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {isEmpty ? "Add" : "Edit"}{" "}
              {formType.charAt(0).toUpperCase() + formType.slice(1)}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {renderFields()}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 bg-gradient-to-r from-${color}-600 to-${color}-500 text-white rounded-lg
                hover:from-${color}-700 hover:to-${color}-600 focus:outline-none focus:ring-2 focus:ring-offset-2 
                focus:ring-${color}-500 transform hover:-translate-y-0.5 transition-all duration-200`}
              >
                {isEmpty ? "Create" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
