import React, { useContext, useState, useEffect, useRef } from "react";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import noteContext from "../context/notes/NoteContext";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;

  let navigate = useNavigate();
  const { editNote } = context;

  const ref = useRef(null);
  const sref = useRef(null);

  const [note, setnote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const handleChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    // addNote(note.title, note.description, note.tag);
    editNote (note.id, note.etitle, note.edescription, note.etag);
    sref.current.click();
    props.showAlert("Note has been updated", "success");
  };

  useEffect(() => {
    if(localStorage.getItem("token"))
    {
      getNotes();
    }
    else{
      navigate("/login");
    }
      
  });

  const updateNote = (currentnote) => {
    ref.current.click();
    setnote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel" >
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="my-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="etitle"
                  name="etitle"
                  aria-describedby="desc"
                  onChange={handleChange}
                  value={note.etitle}

                  minLength={5}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  description
                </label>
                <input
                  className="form-control"
                  id="edescription"
                  name="edescription"
                  type="text"
                  onChange={handleChange}
                  minLength={5}
                  required
                  value={note.edescription}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={sref}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddNote showAlert={props.showAlert} />
      <h3>Your Notes</h3>
      <div className="row row-cols-3  my-3">
        {notes.map((note, i) => {
          return (
            <div key={i}>
              <NoteItem note={note} updateNote={updateNote} showAlert={props.showAlert} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Notes;
