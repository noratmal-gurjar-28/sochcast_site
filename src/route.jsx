import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EpisodeList from "./components/EpisodeList";
import ShowList from "./components/ShowList";

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/episodes/:slug" element={<EpisodeList />} />
      </Routes>
    </Router>
   
  );
};

export default RouterComponent;
