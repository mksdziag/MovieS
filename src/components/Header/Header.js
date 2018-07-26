import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import Fontawesome from "@fortawesome/react-fontawesome";
import searchIcon from "@fortawesome/fontawesome-free-solid/faSearch";
import loginIcon from "@fortawesome/fontawesome-free-solid/faUserAlt";
import chartLineIcon from "@fortawesome/fontawesome-free-solid/faChartLine";

const header = () => {
  return (
    <header className="app-header">
      <nav className="app-nav">
        <div className="app-header__logo-wrapper">
          <NavLink strict={true} className="nav-link app-nav__logo" to="/">
            MovieBD
          </NavLink>
        </div>
        <div className="nav-links__wrapper">
          <NavLink className="nav-link" to="/trending">
            Trending
            <Fontawesome style={{ margin: "0  .5rem" }} icon={chartLineIcon} />
          </NavLink>
          <NavLink className="nav-link" to="/search">
            Search
            <Fontawesome style={{ margin: "0 1rem 0 .5rem" }} icon={searchIcon} />
          </NavLink>
          <NavLink strict={true} className="nav-link" to="/auth">
            Log in
            <Fontawesome style={{ margin: "0  .5rem" }} icon={loginIcon} />
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default header;
