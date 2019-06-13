import React from "react";
import { NavLink } from "react-router-dom";

export const Nav = () => (<nav>
  <NavLink exact to="/">Home</NavLink>
  <NavLink to="/photo">Photo</NavLink>
  <NavLink to="/staff">Staff</NavLink>
  <NavLink to="/linebreak">Linebreak</NavLink>
  <NavLink to="/filler">Filler Text</NavLink>
</nav>);