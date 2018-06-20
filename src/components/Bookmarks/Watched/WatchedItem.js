import React from "react";
import { Link } from "react-router-dom";

const watchedItem = ({
  id,
  noteBackground,
  vote_average,
  my_note,
  title,
  poster_path,
  release_date
}) => {
  return (
    <div className="watched__card" key={id}>
      <img
        className="watched__movie-cover"
        src={poster_path && `https://image.tmdb.org/t/p/w500${poster_path}`}
        alt="movie cover"
      />
      <div>
        <Link to={`/movies/${id}`}>
          <h3 className="watched__movie-title">
            "{title}"{" "}
            <span className="watched__movie-title-year">
              {"(" + release_date.substr(0, 4) + ")"}
            </span>
          </h3>
        </Link>
      </div>
      <div className="watched__ratings">
        <div style={noteBackground} className="watched__rating">
          <span className="watched__rating-count">{vote_average}</span>
          <span className="watched__rating-desc">average</span>
        </div>
        <div className="watched__my-note">
          <span className="watched__my-note-count">{my_note}</span>
          <span className="watched__my-note-desc">my note</span>
        </div>
      </div>
      <div className="watched__actions">
        <button className="btn ">share</button>
        <button className="btn btn--delete">delete</button>
      </div>
    </div>
  );
};

export default watchedItem;
