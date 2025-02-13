import React, { useContext, useState } from "react";
import { StateContext } from "../app/StateProvider";
import { Note } from "../types/types";

type NotesProps = {
  notes: Note[];
};

export const Notes: React.FC = () => {
  const { allNotes, setAllNotes } = useContext(StateContext);
  return (
    <div>
      <h1>All Notes</h1>
      {allNotes.map((note: Note) => (
        <div>
          <h2 className="text-2xl font-bold">{note.title}</h2>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit
            voluptate delectus consequatur accusantium dolores culpa vel quod
            quaerat modi. Fugiat, nobis beatae. Libero non assumenda quaerat ab
            totam possimus quod.
          </p>
        </div>
      ))}
    </div>
  );
};
