// import React from "react";
// import { NavLink } from "react-router-dom";
// import "./Nav.css";
// import { GoHome, GoHomeFill } from "react-icons/go";
// import { TbCamera, TbCameraFilled } from "react-icons/tb";
// import { FaRegUser, FaUser } from "react-icons/fa";
// import { BsTextWrap } from "react-icons/bs";
// import { LuWrapText } from "react-icons/lu";
// import { PiTextAlignLeft, PiTextAlignLeftFill } from "react-icons/pi";


// export const Nav = () => {

//   return (
//     <div className="navbar">
//       <div className="logo">
//         <img src="/Bee.png" alt="Buzz Logo" className="logo-image" />
//         <span>Buzz</span>
//       </div>
//       <nav className="nav-list">
//         <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : undefined)}>
//           <span className="nav-item">
//             <GoHomeFill className="icon active-icon" />
//             <GoHome className="icon inactive-icon" />
//             Home
//           </span>
//         </NavLink>
//         {/* <NavLink to="/photo" className={({ isActive }) => (isActive ? "active-link" : undefined)}>
//           <span className="nav-item">
//             <TbCameraFilled className="icon active-icon" />
//             <TbCamera className="icon inactive-icon" />
//             Photo
//           </span>
//         </NavLink> */}

//         <NavLink to="/filler" className={({ isActive }) => (isActive ? "active-link" : undefined)}>
//           <span className="nav-item">
//             <PiTextAlignLeftFill className="icon active-icon"/>
//             <PiTextAlignLeft className="icon inactive-icon" />
//             Filler Text
//           </span>
//         </NavLink>
//         <NavLink to="/linebreak" className={({ isActive }) => (isActive ? "active-link" : undefined)}>
//           <span className="nav-item">
//             <LuWrapText className="icon active-icon" />
//             <BsTextWrap className="icon inactive-icon" />
//             Linebreak
//           </span>
//         </NavLink>
//         <a href="https://docs.google.com/spreadsheets/d/1cq9vRst1a8p1RJtGtL9ubaHlfNEcfMEEk60XOMMQiHw/edit?gid=10#gid=10" target="_blank" 
//         // className={({ isActive }) => (isActive ? "active-link" : undefined)}
//         >
//           <span className="nav-item">
//             <FaUser className="icon active-icon" />
//             <FaRegUser className="icon inactive-icon" />
//             Staff
//           </span>
//         </a>
//       </nav>
//     </div>
//   );
// };

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import { GoHome, GoHomeFill } from "react-icons/go";
import { TbCamera, TbCameraFilled } from "react-icons/tb";
import { FaRegUser, FaUser } from "react-icons/fa";
import { BsTextWrap } from "react-icons/bs";
import { LuWrapText } from "react-icons/lu";
import { PiTextAlignLeft, PiTextAlignLeftFill } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <div className="navbar">
      <div className="top-bar">
        <button 
        className="hamburger" 
        onClick={toggleMenu}>
          <GiHamburgerMenu size={24} />
        </button>
      </div>
      <nav className={`nav-list ${isOpen ? "open" : ""}`}>
        <div className="logo">
          <img src="/Bee.png" alt="Buzz Logo" className="logo-image" />
          <span>Buzz</span>
        </div>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : undefined)}>
          <span className="nav-item">
            <GoHomeFill className="icon active-icon" />
            <GoHome className="icon inactive-icon" />
            Home
          </span>
        </NavLink>

        <NavLink to="/filler" className={({ isActive }) => (isActive ? "active-link" : undefined)}>
          <span className="nav-item">
            <PiTextAlignLeftFill className="icon active-icon"/>
            <PiTextAlignLeft className="icon inactive-icon" />
            Filler Text
          </span>
        </NavLink>

        <NavLink to="/linebreak" className={({ isActive }) => (isActive ? "active-link" : undefined)}>
          <span className="nav-item">
            <LuWrapText className="icon active-icon" />
            <BsTextWrap className="icon inactive-icon" />
            Linebreak
          </span>
        </NavLink>

        <a href="https://docs.google.com/spreadsheets/d/1cq9vRst1a8p1RJtGtL9ubaHlfNEcfMEEk60XOMMQiHw/edit?gid=10#gid=10" target="_blank">
          <span className="nav-item">
            <FaUser className="icon active-icon" />
            <FaRegUser className="icon inactive-icon" />
            Staff
          </span>
        </a>
      </nav>
    </div>
  );
};
