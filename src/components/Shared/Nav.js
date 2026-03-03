import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import { GoHome, GoHomeFill } from "react-icons/go";
import { TbCamera, TbCameraFilled } from "react-icons/tb";
import { FaRegUser, FaUser } from "react-icons/fa";
import { BsTextWrap } from "react-icons/bs";
import { LuWrapText } from "react-icons/lu";
import { PiTextAlignLeft, PiTextAlignLeftFill } from "react-icons/pi";
import { FiMenu, FiX } from "react-icons/fi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; 


export const Nav = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className={`navbar ${open ? "" : "collapsed"}`}>
      <div style={{ display: "flex", 
        width: "100%", 
        justifyContent: "space-between", 
        alignItems: "center"
        }}
        >
        <div className="logo">
          <img src="/Bee.png" alt="Buzz Logo" className="logo-image" />
          <span>Buzz</span>
          <button className="chevron-toggle" onClick={() => setOpen(!open)}>
            {open ? <FiChevronLeft size={15} /> : <FiChevronRight size={15} />}
          </button>
        </div>
      </div>
      
      <nav className={`nav-list ${open ? "open" : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active-link" : undefined)}
        >
          <span className={`nav-item ${open ? "" : "collapsed"}`}>
            <GoHomeFill className="icon active-icon" />
            <GoHome className="icon inactive-icon" />
              Home
          </span>
        </NavLink>
        {/* <NavLink to="/photo" className={({ isActive }) => (isActive ? "active-link" : undefined)}>
          <span className="nav-item">
            <TbCameraFilled className="icon active-icon" />
            <TbCamera className="icon inactive-icon" />
            Photo
          </span>
        </NavLink> */}

        <NavLink
          to="/filler"
          className={({ isActive }) => (isActive ? "active-link" : undefined)}
        >
          <span className={`nav-item ${open ? "" : "collapsed"}`}>
            <PiTextAlignLeftFill className="icon active-icon" />
            <PiTextAlignLeft className="icon inactive-icon" />
            Filler Text
          </span>
        </NavLink>
        <NavLink
          to="/linebreak"
          className={({ isActive }) => (isActive ? "active-link" : undefined)}
        >
          <span className={`nav-item ${open ? "" : "collapsed"}`}>
            <LuWrapText className="icon active-icon" />
            <BsTextWrap className="icon inactive-icon" />
            Linebreak
          </span>
        </NavLink>
        <a
          href="https://docs.google.com/spreadsheets/d/1ElA8T4ju6M0S7RXvDVk4KzKhtL-eFbN6y_5wup7OQu4/edit?gid=10#gid=10"
          target="_blank"
        >
          <span className={`nav-item ${open ? "" : "collapsed"}`}>
            <FaUser className="icon active-icon" />
            <FaRegUser className="icon inactive-icon" />
            Staff
          </span>
        </a>
        {/* <a href="https://docs.google.com/spreadsheets/d/1tBhg1Vu2pNKKfJYoAOM528_I6S8AoUhG_hymYb0jXUk/edit?gid=0#gid=0" target="_blank"         >
          <span className="nav-item">
            <FaUser className="icon active-icon" />
            <FaRegUser className="icon inactive-icon" />
            Photo Initials
          </span>
        </a> */}
      </nav>
      </div>
  );
};
