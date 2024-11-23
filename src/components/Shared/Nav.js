import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import { GoHome, GoHomeFill } from "react-icons/go";
import { TbCamera, TbCameraFilled } from "react-icons/tb";
import { FaRegUser, FaUser } from "react-icons/fa";
import { BsTextWrap } from "react-icons/bs";
import { LuWrapText } from "react-icons/lu";
import { PiTextAlignLeft, PiTextAlignLeftFill } from "react-icons/pi";


export const Nav = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="/Bee.png" alt="Buzz Logo" className="logo-image" />
        <span>Buzz</span>
      </div>
      <nav className="nav-list">
        <NavLink exact to="/" activeClassName="active-link">
          <span className="nav-item">
            <GoHomeFill className="icon active-icon" />
            <GoHome className="icon inactive-icon" />
            Home
          </span>
        </NavLink>
        <NavLink to="/photo" activeClassName="active-link">
          <span className="nav-item">
            <TbCameraFilled className="icon active-icon" />
            <TbCamera className="icon inactive-icon" />
            Photo
          </span>
        </NavLink>
        <NavLink to="/staff" activeClassName="active-link">
          <span className="nav-item">
            <FaUser className="icon active-icon" />
            <FaRegUser className="icon inactive-icon" />
            Staff
          </span>
        </NavLink>
        <NavLink to="/linebreak" activeClassName="active-link">
          <span className="nav-item">
            <LuWrapText className="icon active-icon" />
            <BsTextWrap className="icon inactive-icon" />
            Linebreak
          </span>
        </NavLink>
        <NavLink to="/filler" activeClassName="active-link">
          <span className="nav-item">
            <PiTextAlignLeftFill className="icon active-icon"/>
            <PiTextAlignLeft className="icon inactive-icon" />
            Filler Text
          </span>
        </NavLink>
      </nav>
    </div>
  );
};