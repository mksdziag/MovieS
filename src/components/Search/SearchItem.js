import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";

const searchItem = ({
  id,
  poster_path,
  original_title,
  release_date,
  overview,
  userRatingHandler,
  toWatchHandler,
}) => {
  return (
    <li className="search__card">
      <Link to={`/search/${id}`}>
        <div className="search__movie-details">
          <img
            className="search__movie-cover"
            src={poster_path && `https://image.tmdb.org/t/p/w500${poster_path}`}
            alt=""
          />
          <div className="search__movie-details-wrapper">
            <h3 className="search__movie-title">{original_title}</h3>
            <p className="search__release-year">Release Year: {release_date.substring(0, 4)};</p>
            <p className="search__movie-overview">
              {overview.split(" ").length > 45
                ? overview
                    .split(" ")
                    .splice(0, 40)
                    .join(" ") + `...`
                : overview}
            </p>
          </div>
        </div>
      </Link>
      <div className="search__actions">
        <button onClick={() => toWatchHandler(id)} className="btn">
          Want to watch
        </button>
        <Rating userRatingHandler={e => userRatingHandler(e.target.value, id)} />
      </div>
    </li>
  );
};

export default searchItem;
