import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Books from "./Books";
import Authors from "./Authors";
import Home from "./Home";
import AddBook from "./AddBook";

const MainApp = () => {
  const navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route path="/" element=<Home /> />
        <Route path="/books" element=<Books /> />
        <Route path="/authors" element=<Authors /> />
      </Routes>
    </>
  );
};

export default MainApp;
