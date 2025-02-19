import { useContext, useEffect, useState } from "react";
import { StateContext } from "../app/StateProvider";
import { useParams, useNavigate } from "react-router-dom";
import { Note } from "../types/types";

export const NoteEditor = () => {
  const { allNotes, editNote } = useContext(StateContext);
  const { noteId } = useParams();
  const navigate = useNavigate();

  const parsedNoteId = parseInt(noteId as string, 10);
  if (isNaN(parsedNoteId)) {
    navigate("/notes");
    return null;
  }

  const note = allNotes.find((note: Note) => note.id === parsedNoteId);
  const [updatedNote, setUpdatedNote] = useState<Note>(
    note || { id: parsedNoteId, title: "", content: "" }
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
    <div>
      <h1 className="text-3xl font-bold mb-8 border-b-2 p-4">Edit Note</h1>
      <div className="flex justify-center">
        {note ? (
          <div className="flex flex-col  text-center w-4/6">
            <label htmlFor="title">Title</label>
            <br />
            <input
              className="w-full p-2 rounded-lg"
              id="title"
              name="title"
              type="text"
              value={updatedNote?.title}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="content">Content</label>
            <br />
            <textarea
              className="w-full p-6 rounded-lg"
              rows={20}
              id="content"
              name="content"
              value={updatedNote?.content}
              onChange={handleChange}
            />
            <div className="mt-4 flex space-x-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg max-h-12"
                onClick={() => handleSave()}
              >
                Save Note
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg max-h-12"
                onClick={() => navigate(`/notes`)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p>Note not found</p>
        )}
      </div>
    </div>
  );
};
