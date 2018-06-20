import React from "react";
import { connect } from "react-redux";
import "./MoviePage.css";
const moviePage = ({ match, watchedMovies }) => {
  const targetMovie = watchedMovies.find(
    movie => movie.id === parseFloat(match.params.id)
  );
  const { title, overview, release_date, poster_path } = targetMovie;
  return (
    <div>
      <div className="movie-card">
        <div
          className="movie-card__cover-spot"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster_path})`
          }}
        >
          <span className="movie-card__small-title">{title}</span>
        </div>
        <div className="movie-card__overview-wrapper">
          <h4 className="movie-card__release-date">Released: {release_date}</h4>
          <h2 className="movie-card__title">"{title}"</h2>
          <p className="movie-card__overview">{overview}</p>
          <button className="btn btn--secondary">Watch online</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    watchedMovies: state.watched
  };
};

export default connect(mapStateToProps)(moviePage);
