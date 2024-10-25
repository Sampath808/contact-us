import "./App.css";
import Contact from "./Contact";
import Navbar from "./Navbar";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GridWithFirestore from "./GridWithFirestore";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Contact />} />
        <Route path="/sub" element={<GridWithFirestore />} />
      </Routes>
    </Router>
  );
}

export default App;
