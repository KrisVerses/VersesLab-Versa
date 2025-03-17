import React, { useContext } from "react";
import { StateContext } from "../app/StateProvider";
import { Note } from "../types/types";
import { motion } from "framer-motion";
import { DynamicFormModal } from "./DynamicFormModal";

export const RecentNotes: React.FC = () => {
  const context = useContext(StateContext);
  const [selectedNote, setSelectedNote] = React.useState<Note | null>(null);
  
  if (!context) {
    return null;
  }

  const { notes, editNote } = context;
  const recentNotes = notes.slice(-3).reverse(); // Get last 3 notes in reverse order

  const handleSave = (data: any) => {
    if (data.type !== "note" || !selectedNote) return;
    editNote({ ...data, id: selectedNote.id });
    setSelectedNote(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl hover:shadow-xl transition-shadow duration-300"
    >
      {/* <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Recent Notes
        </h3>
        <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
      </div> */}

      {recentNotes.length > 0 ? (
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {recentNotes.map((note: Note) => (
            <motion.li
              key={note.id}
              variants={itemVariants}
              onClick={() => setSelectedNote(note)}
              className="group p-3 bg-gray-50 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 cursor-pointer"
            >
              <h4 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors truncate text-sm">
                {note.title}
              </h4>
              <p className="text-gray-500 text-xs leading-snug break-words line-clamp-1 overflow-hidden">
                {note.content}
              </p>
              <div className="mt-1.5 flex items-center text-xs text-gray-400">
                <span>
                  {new Date(note.createdAt || Date.now()).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-8 text-center"
        >
          <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No notes yet</p>
          <p className="text-gray-400 text-sm mt-1">Create your first note to get started</p>
        </motion.div>
      )}

      {selectedNote && (
        <DynamicFormModal
          formType="note"
          onClose={() => setSelectedNote(null)}
          onSave={handleSave}
          initialData={selectedNote}
        />
      )}
    </motion.div>
  );
};
