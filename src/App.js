// import { hot } from "react-hot-loader/root";
import React from 'react';
// import { Switch, Route } from 'react-router'
import { Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import {PhotoInitials} from "./components/PhotoInitials";
import {Nav} from "./components/Shared/Nav";
import {Linebreak} from "./components/Linebreak";
import {Filler} from "./components/Filler";
import {StaffList} from "./components/Staff";

function App() {
  return (
    <div className="app-container">
      <Nav />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/photo" element={<PhotoInitials/>} />
          <Route path="/staff" element={<StaffList/>} />
          <Route path="/linebreak" element={<Linebreak/>} />
          <Route path="/filler" element={<Filler/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
