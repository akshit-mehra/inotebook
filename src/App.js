import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";

function App() {
  return (
    <>
    <NoteState>

      <Router>
      <Navbar />
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />}>
        </Route>
      </Routes>
    </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
