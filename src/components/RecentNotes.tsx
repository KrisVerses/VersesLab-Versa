import React from "react";

type RecentNotes = { id: number; title: string };

type RecentNotesProps = {
  recentNotes: RecentNotes[];
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
