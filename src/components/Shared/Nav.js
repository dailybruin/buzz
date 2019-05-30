import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => (<nav>
  <Link to="/">Home</Link>
  <Link to="/photo">Photo</Link>
  <Link to="/staff">Staff</Link>
  <Link to="/linebreak">Linebreak</Link>
  <Link to="/filler">Filler Text</Link>
</nav>);