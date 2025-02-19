import React, { useContext } from "react";
import { StateContext } from "../app/StateProvider";
import { Note } from "../types/types";

export const RecentNotes: React.FC = () => {
  const { recentNotes } = useContext(StateContext);
  return (
    <div>
      <h3 className="text-lg font-bold">Recent Notes</h3>
      {recentNotes.length > 0 ? (
        <div>
          <ul>
            {recentNotes.map((note: Note) => (
              <li key={note.id}>- {note.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500 italic">No Notes</p>
      )}
    </div>
  );
};
