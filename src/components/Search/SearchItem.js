import React from "react";

import Rating from "../Rating/Rating";

const searchItem = ({
  id,
  poster_path,
  original_title,
  release_date,
  overview,
  userRatingHandler,
  wantToWatchHandler
}) => {
  return (
    <li className="search__list-item">
      <img
        className="search__movie-cover"
        src={poster_path && `https://image.tmdb.org/t/p/w500${poster_path}`}
        alt=""
      />
      <Rating userRatingHandler={e => userRatingHandler(e.target.value, id)} />
      <div>
        <h3 className="search__movie-title">{original_title}</h3>
        <p className="search__release-year">
          Release Year: {release_date.substring(0, 4)};
        </p>
        <p className="search__movie-overview">
          {overview.split(" ").length > 45
            ? overview
                .split(" ")
                .splice(0, 40)
                .join(" ") + `...`
            : overview}
        </p>
      </div>
      <div className="search__action-buttons">
        <button
          onClick={() => wantToWatchHandler(id)}
          className="btn btn--want"
        >
          Want to watch
        </button>
      </div>
    </li>
  );
};

export default searchItem;
