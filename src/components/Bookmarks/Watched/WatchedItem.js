import React from "react";
import { Link, Route } from "react-router-dom";

const watchedItem = ({
  id,
  noteBackground,
  vote_average,
  my_note,
  title,
  poster_path
}) => {
  return (
    <div className="watched__item" key={id}>
      <div className="watched__cover-wrapper">
        <img
          className="watched__movie-cover"
          src={poster_path && `https://image.tmdb.org/t/p/w500${poster_path}`}
          alt="movie cover"
        />

        <span style={noteBackground} className="watched__note">
          {vote_average}
        </span>
        <span className="watched__my-note">{my_note}</span>
      </div>
      <div>
        <Link to="/moviePage">
          <h3 className="watched__movie-title">"{title}"</h3>
        </Link>
      </div>
    </div>
  );
};

export default watchedItem;
