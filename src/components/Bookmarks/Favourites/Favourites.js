import React from "react";
import "./Favourites.css";

const favourites = props => {
  const sortedWatchedMovies = props.movies.sort(
    (a, b) => b.my_note >= a.my_note
  );
  const top3 = sortedWatchedMovies.slice(0, 3);

  const favourites = top3.map(movie => {
    return (
      <li className="favourites__content" key={movie.id}>
        <div className="favourites__cover-wrapper">
          <img
            className="favourites__movie-cover"
            src={
              movie.poster_path &&
              `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            }
            alt="movie cover"
          />
          <span className="favourites__movie-my-note">{movie.my_note}</span>
          <span className="favourites__movie-place">
            {top3.indexOf(movie) + 1}.
          </span>
        </div>
        <div>
          <h3 className="favourites__movie-title">"{movie.title}"</h3>
        </div>
      </li>
    );
  });

  return (
    <div className="favourites__wrapper">
      <h2 className="favourites__title">My top 3</h2>
      <ul className="favourites__movies-wrapper">{favourites}</ul>
    </div>
  );
};

export default favourites;
