import React from "react";
import { useContext } from "react";
import contextValue from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const context = useContext(contextValue);
  const { notes, setNotes } = context;

  return (
    <>
        <h3>Your Notes</h3>
      <div className="row row-cols-3  my-3">
        {notes.map((note, i) => {
          return (
            <div key={i}>
              <NoteItem note={note} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
