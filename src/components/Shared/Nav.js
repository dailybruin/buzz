import React from "react";
import { NavLink } from "react-router-dom";
import { Breadcrumbs } from '@mui/material';

// export const Nav = () => (<nav>
//   <NavLink exact to="/">Home</NavLink>
//   <NavLink to="/photo">Photo</NavLink>
//   <NavLink to="/staff">Staff</NavLink>
//   <NavLink to="/linebreak">Linebreak</NavLink>
//   <NavLink to="/filler">Filler Text</NavLink>
// </nav>);

export const Nav = () => (
  <Breadcrumbs aria-label="breadcrumb">
    <NavLink exact to="/">Home</NavLink>
    <NavLink to="/photo">Photo</NavLink>
    <NavLink to="/staff">Staff</NavLink>
    <NavLink to="/linebreak">Linebreak</NavLink>
    <NavLink to="/filler">Filler Text</NavLink>

  </Breadcrumbs>

);