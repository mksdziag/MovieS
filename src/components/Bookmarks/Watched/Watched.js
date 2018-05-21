import React from "react";
import "./Watched.css";
import { Link } from "react-router-dom";
import MoviePage from "../../MoviePage/MoviePage";

const watched = props => {
  const watched = props.movies.map(movie => {
    return (
      <div className="watched__content" key={movie.id}>
        <div className="watched__cover-wrapper">
          <Link to="/:id" component={MoviePage}>
            <img
              className="watched__movie-cover"
              src={
                movie.poster_path &&
                `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              }
              alt="movie cover"
            />
          </Link>
          <span className="watched__movie-note">{movie.vote_average}</span>
          <span className="watched__movie-my-note">{movie.my_note}</span>
        </div>
        <div>
          <Link to="/:id" component={MoviePage}>
            <h3 className="watched__movie-title">"{movie.title}"</h3>
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div className="watched__wrapper">
      <h2 className="watched__title">Watched movies</h2>
      <div className="watched__movies-wrapper">{watched}</div>
    </div>
  );
};

export default watched;
