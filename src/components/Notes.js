import React, { useEffect } from "react";
import { useContext } from "react";
import contextValue from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import noteContext from "../context/notes/NoteContext";


const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;

  
  useEffect(() => {
    getNotes();
  }, [])
  
  return (
    <>
        <AddNote/>
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
