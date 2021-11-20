import { hot } from "react-hot-loader/root";
import React from 'react';
import { Switch, Route } from 'react-router'

import Home from "./components/Home";
import { PhotoInitials } from "./components/PhotoInitials";
import { Nav } from "./components/Shared/Nav";
import { Linebreak } from "./components/Linebreak";
import { Filler } from "./components/Filler";
import { StaffList } from "./components/Staff";

function App() {
  return (
    <div className="App">
      <Nav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/photo" component={PhotoInitials} />
        <Route path="/staff" component={StaffList} />
        <Route path="/linebreak" component={Linebreak} />
        <Route path="/filler" component={Filler} />
      </Switch>
    </div>
  );
}

export default hot(App);
