import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

export const Nav = () => {
  return (
    <nav className="nav-container">
      <ul className="nav-links">
        <li>
          <NavLink exact to="/" className="nav-link">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/photo" className="nav-link">
            Photo
          </NavLink>
        </li>
        <li>
          <NavLink to="/staff" className="nav-link">
            Staff
          </NavLink>
        </li>
        <li>
          <NavLink to="/linebreak" className="nav-link">
            Linebreak
          </NavLink>
        </li>
        <li>
          <NavLink to="/filler" className="nav-link">
            Filler Text
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};