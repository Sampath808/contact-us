import { useState } from "react";
import "./App.css";
import Contact from "./Contact";
import Footer from "./Footer";
import Header from "./Header";
import PostList from "./PostsList";

function App() {
  return (
    <div className="App">
      <Header />
      <PostList />
      <Contact />
    </div>
  );
}

export default App;
