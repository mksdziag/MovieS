import React from "react";
import "./SectionTitle.css";

const SectionTitle = ({ title }) => {
  return (
    <div>
      <h2 className="section__title favourites__section-title">{title}</h2>
    </div>
  );
};

export default SectionTitle;
