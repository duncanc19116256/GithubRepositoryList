import React from "react";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Backdrop } from "@mui/material";

import RepoList from "./components/repoList";
import RepoDetails from "./components/repoDetails";
import Header from "./components/Header";
import Help from "./components/Help";
function App() {
  const [helpOverlay, setHelpOverlay] = useState(false);

  const handleHelpOverlay = () => {
    setHelpOverlay((prev) => !prev);
  };

  return (
    <div className="App">
      <Header onHelpClick={() => handleHelpOverlay()} />
      <BrowserRouter>
        <Routes>
          <Route path="/users/:owner/repos/:repo" element={<RepoDetails />} />
          <Route path="/users/:owner/repos" element={<RepoList />} />
          <Route path="/users//repos" element={<RepoList />} />
          <Route path="/*" element={<RepoList />} />
        </Routes>
      </BrowserRouter>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={helpOverlay}
        onClick={handleHelpOverlay}
      >
        <Help />
      </Backdrop>
    </div>
  );
}

export default App;
