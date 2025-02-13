import React, { useState } from "react";
import { Task, Appointment, Note } from "../types/types";

type FormType = "task" | "appointment" | "note";

type DynamicFormModalProps = {
  formType: FormType;
  onClose: () => void;
  onSave: (data: Task | Appointment | Note) => void;
};

export const DynamicFormModal: React.FC<DynamicFormModalProps> = ({
  formType,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
              onChange={handleChange}
            />
            <input
              type="date"
              name="dueDate"
              className="input"
              onChange={handleChange}
            />
          </>
        );
      case "appointment":
        return (
          <>
            <input
              type="text"
              name="description"
              placeholder="Appointment Title"
              className="input"
              onChange={handleChange}
            />
            <input
              type="date"
              name="dueDate"
              className="input"
              onChange={handleChange}
            />
            <input
              type="time"
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
          Add {formType.charAt(0).toUpperCase() + formType.slice(1)}
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
