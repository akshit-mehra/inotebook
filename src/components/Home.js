import React from "react";
import Notes from "./Notes"

const Home = (props) => {


  return (
    <>
       <div className="my-5">
        </div>
      <Notes showAlert={props.showAlert} />
    </>
  );
};

export default Home;
