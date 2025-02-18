import React, { useContext, useState } from "react";
import { DynamicFormModalProps, FormInput } from "../types/types";

export const DynamicFormModal: React.FC<DynamicFormModalProps> = ({
  formType,
  initialData = {},
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<FormInput>({
    id: Date.now(),
    description: "",
    dueDate: "",
    completed: false,
    priority: "",
    ...initialData,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      type: formType,
      id: formData.id || Date.now(),
      completed: formData.completed ?? false,
      time: formData.time || "00:00",
    };
    onSave(formattedData);
    onClose();
  };

  const renderFields = () => {
    switch (formType) {
      case "task":
        return (
          <>
            <input
              type="text"
              name="description"
              placeholder="Task Description"
              className="input"
              value={formData.description || ""}
              onChange={handleChange}
            />
            <input
              type="date"
              name="dueDate"
              className="input"
              value={formData.dueDate || ""}
              onChange={handleChange}
            />
            <select
              className="input"
              name="priority"
              value={formData.priority || "Select Priority"}
              onChange={handleChange}
            >
              <option disabled value="Select Priority">
                Select Priority
              </option>
              <option value={"High"}>High</option>
              <option value={"Medium"}>Medium</option>
              <option value={"Low"}>Low</option>
            </select>
          </>
        );
      case "appointment":
        return (
          <>
            <input
              type="text"
              name="description"
              value={formData.description || " "}
              placeholder="Appointment Title"
              className="input"
              onChange={handleChange}
            />
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate || " "}
              className="input"
              onChange={handleChange}
            />
            <input
              type="time"
              value={formData.time || " "}
              name="time"
              className="input"
              onChange={handleChange}
            />
          </>
        );
      case "note":
        return (
          <>
            <input
              type="text"
              name="title"
              placeholder="Note Title"
              className="input"
              onChange={handleChange}
            />
            <textarea
              name="content"
              placeholder="Write your note here..."
              className="input h-24"
              onChange={handleChange}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit" : "Add"}{" "}
          {formType.charAt(0).toUpperCase() + formType.slice(1)}
        </h2>
        <form onSubmit={handleSubmit}>
          {renderFields()}
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="btn-secondary mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
