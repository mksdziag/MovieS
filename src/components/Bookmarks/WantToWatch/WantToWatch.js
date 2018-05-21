import React from "react";
import "./WantToWatch.css";
import Rating from "../../Rating/Rating";

const wantToWatch = props => {
  const moviesToWatch = props.movies.map(movie => {
    return (
      <div className="to-watch__content" key={movie.id}>
        <div className="to-watch__cover-wrapper">
          <img
            className="to-watch__movie-cover"
            src={
              movie.poster_path &&
              `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            }
            alt="movie cover"
          />
          <span className="to-watch__movie-note">{movie.vote_average}</span>
          <Rating
            userRatingHandler={e =>
              props.userRatingHandler(e.target.value, movie.id)
            }
          />
        </div>
        <div>
          <h3 className="to-watch__movie-title">"{movie.title}"</h3>
          <p className="to-watch__movie-release">
            Released: {movie.release_date}
          </p>
          <p className="to-watch__movie-desc">{movie.overview}</p>
        </div>
        <div>
          <button className="btn btn--rate">Rate</button>
        </div>
      </div>
    );
  });

  return (
    <div className="to-watch__wrapper">
      <h2 className="to-watch__title">Want to watch</h2>
      {moviesToWatch}
    </div>
  );
};

export default wantToWatch;
