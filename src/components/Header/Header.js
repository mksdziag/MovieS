import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const header = () => {
  return (
    <div className="site-header">
      <div className="site-header__logo-wrapper">
        <Link to="/">MovieBD</Link>
      </div>
      <Link to="/search">Search</Link>
    </div>
  );
};

export default header;
