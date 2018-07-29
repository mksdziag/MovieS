import React from "react";
import { Link } from "react-router-dom";

const favouritesItem = ({ id, poster_path, my_note, idx, title }) => {
  return (
    <li className="favourites__card" key={id}>
      <Link to={`/movies/${id}`}>
        <img
          className="favourites__movie-cover"
          src={poster_path && `https://image.tmdb.org/t/p/w500${poster_path}`}
          alt="movie cover"
        />
      </Link>
      <span className="favourites__my-note">
        <span className="favourites__my-note-desc">my note:</span>
        {my_note}
      </span>
      <span className="favourites__place">{idx + 1}.</span>

      <div>
        <Link className="watched__movie-title-link" to={`/movies/${id}`}>
          <h3 className="favourites__movie-title">"{title}"</h3>
        </Link>
      </div>
    </li>
  );
};

export default favouritesItem;
