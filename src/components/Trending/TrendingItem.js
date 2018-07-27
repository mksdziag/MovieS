import React from "react";
import { Link } from "react-router-dom";
import movieRatingColorize from "../../assets/movieRatingColorize";

const searchItem = ({ id, vote_average, poster_path, original_title, release_date }) => {
  const noteBackground = movieRatingColorize(vote_average);

  return (
    <Link to={`/movies/${id}`}>
      <li className="trending-item">
        <img
          className="trending-item__movie-cover"
          src={poster_path && `https://image.tmdb.org/t/p/w500${poster_path}`}
          alt=""
        />
        <div style={noteBackground} className="trending-item__rating">
          <span className="trending-item__rating-count">{vote_average}</span>
          <span className="trending-item__rating-desc">average</span>
        </div>
        <div className="trending-item__movie-details-wrapper">
          <h3 className="trending-item__movie-title">{original_title}</h3>
          <p className="trending-item__release-year">Release Date: {release_date};</p>
        </div>
        <div className="trending-item__actions" />
      </li>
    </Link>
  );
};

export default searchItem;
