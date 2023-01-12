import React from "react";
import noteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const InitialNotes = [];

  const [notes, setNotes] = useState(InitialNotes);

  // GEt all notes

  const getNotes = async () => {
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhMDY1Mzc5ZDIzN2M4MzNkYzZmNDYxIn0sImlhdCI6MTY3MTU0MTgxNH0.3jlQLS9hQmIzwOpj1Rh2yHPLis_m5UvfGol99H6eoDE",
      },
    });

    const json = await response.json();
    //  console.log(json)
    setNotes(json);
  };

  // Add note
  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhMDY1Mzc5ZDIzN2M4MzNkYzZmNDYxIn0sImlhdCI6MTY3MTU0MTgxNH0.3jlQLS9hQmIzwOpj1Rh2yHPLis_m5UvfGol99H6eoDE",
      },

      body: JSON.stringify({ title, description, tag }),
    });

    const note = {
      _id: "63a4c599dd6cd2769bd0b956",
      user: "63a065379d237c833dc6f461",
      title: title,
      description: description,
      tag: tag,
      date: "2022-12-22T21:01:13.714Z",
      __v: 0,
    };

    console.log("adding a new note");
    setNotes(notes.concat(note));
  };

  // DELETE a note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhMDY1Mzc5ZDIzN2M4MzNkYzZmNDYxIn0sImlhdCI6MTY3MTU0MTgxNH0.3jlQLS9hQmIzwOpj1Rh2yHPLis_m5UvfGol99H6eoDE",
      },
    });

    const json = response.json();
    console.log(json);

    console.log("deleteNote   " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // EDIT a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhMDY1Mzc5ZDIzN2M4MzNkYzZmNDYxIn0sImlhdCI6MTY3MTU0MTgxNH0.3jlQLS9hQmIzwOpj1Rh2yHPLis_m5UvfGol99H6eoDE",
      },

      body: JSON.stringify({ title, description, tag }),
    });

    const jsonRes = response.json();

    // Logic to edit on client
    for (let i = 0; i < notes.length; i++) {
      if (notes[i]._id === id) {
        notes[i].title = title;
        notes[i].description = description;
        notes[i].tag = tag;
      }
    }
  };

  return (
    <noteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
