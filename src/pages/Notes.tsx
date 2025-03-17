import React, { useState, useContext } from "react";
import { StateContext } from "../app/StateProvider";
import { DynamicFormModal } from "../components/DynamicFormModal";
import { Note, FormInput } from "../types/types";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export const Notes: React.FC = () => {
  const context = useContext(StateContext);
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [page, setPage] = useState(1);
  const notesPerPage = 8;

  if (!context) {
    return null;
  }

  const { notes, addNote, editNote, deleteNote } = context;

  const handleSave = (data: FormInput) => {
    if (data.type !== "note") return;
    const noteData = data as Note;
    
    if (editingNote) {
      editNote({ ...noteData, id: editingNote.id });
    } else {
      addNote(noteData);
    }
    setShowModal(false);
    setEditingNote(null);
  };

  // Calculate pagination
  const totalPages = Math.ceil(notes.length / notesPerPage);
  const paginatedNotes = notes.slice((page - 1) * notesPerPage, page * notesPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Notes
            </h1>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
            >
              <PlusIcon className="w-5 h-5" />
              Create Note
            </button>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {paginatedNotes.map((note: Note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group p-5 rounded-xl bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                onClick={() => {
                  setEditingNote(note);
                  setShowModal(true);
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 truncate flex-1 mr-2">
                    {note.title}
                  </h3>
                  <div 
                    className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingNote(note);
                        setShowModal(true);
                      }}
                      className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
                      title="Edit note"
                    >
                      <PencilIcon className="w-4 h-4 text-gray-500" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(note.id);
                      }}
                      className="p-1.5 rounded-md hover:bg-red-50 transition-colors"
                      title="Delete note"
                    >
                      <TrashIcon className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 flex-1 line-clamp-2 overflow-hidden leading-snug mb-2 min-h-[2.5rem]">
                  {note.content}
                </p>
                <div className="text-xs text-gray-400">
                  {new Date(note.createdAt || Date.now()).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    page === pageNum
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          )}
        </div>

        {showModal && (
          <DynamicFormModal
            formType="note"
            onClose={() => {
              setShowModal(false);
              setEditingNote(null);
            }}
            onSave={handleSave}
            initialData={editingNote as FormInput}
          />
        )}
      </div>
    </div>
  );
};
