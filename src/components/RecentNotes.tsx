import React from "react";
import { Note } from "../types/types.ts";

type RecentNotesProps = {
  recentNotes: Note[];
};

export const RecentNotes: React.FC<RecentNotesProps> = ({ recentNotes }) => {
  return (
    <div>
      <h3 className="text-lg font-bold">Recent Notes</h3>
      <ul>
        {recentNotes.map((note) => (
          <li key={note.id}>- {note.title}</li>
        ))}
      </ul>
    </div>
  );
};
