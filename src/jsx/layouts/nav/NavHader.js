import React, { useState } from "react";

/// React router dom
import { Link } from "react-router-dom";

/// images
import logo from "../../../img/logo.png";

const NavHader = () => {
   const [toggle, setToggle] = useState(false);
   return (
      <div className="nav-header navbar-header-custom" style={{zIndex: "12"}}>
         <Link to="/" className="brand-logo">
            <img className="sidebar-logo" src={logo} alt="" />
         </Link>

         <div className="nav-control nav-hamburger-menu" onClick={() => setToggle(!toggle)}>
            <div className={`hamburger ${toggle ? "is-active" : ""}`}>
               <span className="line"></span>
               <span className="line"></span>
               <span className="line"></span>
            </div>
         </div>
      </div>
   );
};

export default NavHader;
