import { hot } from "react-hot-loader/root";
import React from 'react';
import { Switch, Route } from 'react-router'

import { Home } from "./components/Home";
import { PhotoInitials } from "./components/PhotoInitials";


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/photo" component={PhotoInitials} />
      </Switch>
    </div>
  );
}

export default hot(App);
