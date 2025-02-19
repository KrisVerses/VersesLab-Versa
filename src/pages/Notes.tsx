import React, { useContext, useState } from "react";
import { StateContext } from "../app/StateProvider";
import { FormInput, Note } from "../types/types";
import { DynamicFormModal } from "../components/DynamicFormModal";
import { getSnippet } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

export const Notes: React.FC = () => {
  const { allNotes, addNote, editNote, deleteNote } = useContext(StateContext);
  const [modalType, setModalType] = useState<"note" | null>(null);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const navigate = useNavigate();

  const handleAdd = () => {
    setSelectedNote(null);
    setModalType("note");
  };

  const handleEdit = (note: Note) => {
    setSelectedNote(note);
    navigate(`/note-editor/${note.id}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 border-b-2 p-4">Notes</h1>
      <div className="w-full text-center">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
          onClick={handleAdd}
        >
          + Add New Note
        </button>
      </div>
      <div className="max-w-3xl mx-auto w-full gap-4">
        {allNotes.length === 0 ? (
          <p className="text-center text-gray-500 italic">No Notes Added</p>
        ) : (
          allNotes.map((note: Note) => (
            <div
              className="flex justify-between shadow-md p-4 rounded-md my-4"
              key={note.id}
            >
              <div>
                <h2 className="text-2xl font-bold">{note.title}</h2>
                <p>{getSnippet(note.content, 100)}</p>
              </div>
              <div className="mt-4 flex space-x-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg max-h-12"
                  onClick={() => handleEdit(note)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg max-h-12"
                  onClick={() => deleteNote(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {modalType === "note" && (
        <DynamicFormModal
          formType="note"
          initialData={!selectedNote ? undefined : selectedNote} // Prefill with the selected task
          onClose={() => {
            setModalType(null);
            setSelectedNote(null);
          }}
          onSave={(updatedData: FormInput) => {
            if (!updatedData) return;
            if (updatedData.type === "note" && selectedNote) {
              editNote(updatedData);
            } else {
              addNote(updatedData);
            }
            setModalType(null);
            setSelectedNote(null);
          }}
        />
      )}
    </div>
  );
};
