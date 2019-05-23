import { hot } from "react-hot-loader/root";
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Home } from "./components/Home";

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default hot(App);
