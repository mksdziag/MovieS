import React from "react";
import { Link } from "react-router-dom";
import movieRatingColorize from "../../assets/movieRatingColorize";
import "./TrendingItem.css";
const searchItem = ({ id, vote_average, poster_path, original_title, release_date, place }) => {
  const noteBackground = movieRatingColorize(vote_average);

  return (
    <li className="trending-item">
      <Link to={`/movies/${id}`}>
        <img
          className="trending-item__movie-cover"
          src={poster_path && `https://image.tmdb.org/t/p/w500${poster_path}`}
          alt=""
        />
        <div className="trending-item__place">{place + "."}</div>
        <div style={noteBackground} className="trending-item__rating">
          <span className="trending-item__rating-count">{vote_average}</span>
        </div>
        <div className="trending-item__movie-details-wrapper">
          <h3 className="trending-item__movie-title">{original_title}</h3>
          <p className="trending-item__release-year">Release Date: {release_date};</p>
        </div>
        <div className="trending-item__actions" />
      </Link>
    </li>
  );
};

export default searchItem;
