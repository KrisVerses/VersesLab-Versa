import React from "react";
import { RecentNote } from "../types/types.ts";

type RecentNotesProps = {
  recentNotes: RecentNote[];
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
