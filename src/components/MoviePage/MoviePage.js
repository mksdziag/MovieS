import React from "react";

const moviePage = props => {
  return (
    <main>
      <div className="movie-page__header">
        <div className="movie-page__cover-wrapper">
          <img
            className="search__movie-cover"
            src={
              props.movie.poster_path &&
              `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
            }
            alt=""
          />
        </div>
        <h3 className="movie-page__title">{props.movie.title}</h3>
        <h4 className="mowie-page__director">{props.movie.director}</h4>
        <p className="mowie-page__release-date">{props.movie.release_date}</p>
      </div>
      <div className="movie-page__content">
        <h4 className="movie-page__ov-title">About movie:</h4>
        <p className="movie-page__ovewview">{props.movie.overview}</p>
      </div>
    </main>
  );
};

export default moviePage;
