import React , { useContext, useState } from "react";
import contextValue from "../context/notes/NoteContext";

const AddNote = () => {

    const context = useContext(contextValue);
    const { addNote } = context;

    const [note, setnote] = useState({title: "", description: "" , tag: "default"});

    const handleChange = (e) => {
        setnote({...note, [e.target.name]: e.target.value});
    };
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnote({title: "", description: "", tag: ""})
    };

  return (
    <form>
      <div className="my-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          aria-describedby="emailHelp"
          onChange={handleChange}
          minLength={5}
          required
          value={note.title}
        />
       
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
         description
        </label>
        <input
          className="form-control"
          id="description"
          name="description"
          type="text"
          onChange={handleChange}
          minLength={5}
          required
          value={note.description}
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleClick}>
        Submit
      </button>
      <div className="mb-4">
     
     
      </div>
    </form>
  );
};

export default AddNote;
