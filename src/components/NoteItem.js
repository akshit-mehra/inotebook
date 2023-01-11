import React from "react";

const NoteItem = (props) => {
  const { note } = props;

  return (
    <>
      <div className="col ">
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.description}</p>

            <div className="d-flex justify-content-between">
              <i className="fa-regular mx-2 fa-trash-can"></i>
              <i className="fa-regular mx-2 fa-pen-to-square"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
