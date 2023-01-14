import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const { note, updateNote } = props;

  const context = useContext(noteContext);
  const { deleteNote } = context;

  return (

    <>
      <div className="col ">
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>

            <div className="d-flex justify-content-between">
              <i className="fa-regular mx-2 fa-trash-can" onClick={() => {deleteNote(note._id); props.showAlert("Note has deleted", "warning");}}></i>
              <i className="fa-regular mx-2 fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
