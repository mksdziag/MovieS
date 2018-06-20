import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import Fontawesome from "@fortawesome/react-fontawesome";
import searchIcon from "@fortawesome/fontawesome-free-solid/faSearch";

const header = () => {
  return (
    <div className="site-header">
      <div className="site-header__logo-wrapper">
        <NavLink strict={true} className="nav-link" to="/">
          MovieBD
        </NavLink>
      </div>
      <NavLink strict={true} className="nav-link" to="/search">
        Search
        <Fontawesome style={{ margin: "0 1rem 0 .5rem" }} icon={searchIcon} />
      </NavLink>
    </div>
  );
};

export default header;
