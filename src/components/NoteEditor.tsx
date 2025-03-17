import { useContext, useEffect, useState } from "react";
import { StateContext } from "../app/StateProvider";
import { useParams, useNavigate } from "react-router-dom";
import { Note } from "../types/types";
import { motion } from "framer-motion";
import { ArrowLeftIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export const NoteEditor = () => {
  const context = useContext(StateContext);
  const { noteId } = useParams();
  const navigate = useNavigate();

  if (!context) {
    return null;
  }

  const { notes, editNote } = context;

  const parsedNoteId = parseInt(noteId as string, 10);
  if (isNaN(parsedNoteId)) {
    navigate("/notes");
    return null;
  }

  const note = notes.find((note: Note) => note.id === parsedNoteId);
  const [updatedNote, setUpdatedNote] = useState<Note>(
    note || { id: parsedNoteId, type: "note", title: "", content: "" }
  );

  useEffect(() => {
    if (!note) {
      navigate("/notes");
    }
  }, [note, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedNote((prev: Note) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!updatedNote) return;
    editNote(updatedNote);
    navigate(`/notes`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/notes")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back to Notes</span>
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Edit Note
          </h1>
        </div>
      </div>

      {note ? (
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                  placeholder-gray-400 transition-all duration-200"
                id="title"
                name="title"
                type="text"
                value={updatedNote?.title}
                onChange={handleChange}
                placeholder="Enter note title..."
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                  placeholder-gray-400 transition-all duration-200 min-h-[400px] resize-y"
                id="content"
                name="content"
                value={updatedNote?.content}
                onChange={handleChange}
                placeholder="Write your note content here..."
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={() => navigate(`/notes`)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg 
                  hover:from-green-600 hover:to-teal-600 transition-all shadow-md hover:shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <DocumentTextIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Note not found</p>
        </motion.div>
      )}
    </motion.div>
  );
};
