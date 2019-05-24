import { hot } from "react-hot-loader/root";
import React from 'react';
import { Switch, Route } from 'react-router'

import './App.css';
import { Home } from "./components/Home";

let TestComponent = () => (
  <h1>ME!</h1>
);

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/me" component={TestComponent} />
      </Switch>
    </div>
  );
}

export default hot(App);
