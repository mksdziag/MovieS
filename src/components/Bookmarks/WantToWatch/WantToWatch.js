import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./WantToWatch.css";
import WantToWatchItem from "./WantToWatchItem";
import movieRatingColorize from "../../../assets/movieRatingColorize";

const wantToWatch = props => {
  const { wantToWatchRED } = props;
  const moviesToWatch = wantToWatchRED.map(movie => {
    const {
      id,
      poster_path,
      vote_average,
      title,
      release_date,
      overview
    } = movie;

    let movieOverwiev = overview.split(" ");
    movieOverwiev =
      movieOverwiev.length > 40
        ? movieOverwiev.slice(0, 40).join(" ") + "..."
        : movieOverwiev.join(" ");

    const noteBackground = movieRatingColorize(vote_average);

    return (
      <WantToWatchItem
        key={id}
        id={id}
        poster_path={poster_path}
        noteBackground={noteBackground}
        vote_average={vote_average}
        title={title}
        release_date={release_date}
        movieOverwiev={movieOverwiev}
      />
    );
  });

  return (
    <section className="section to-watch__wrapper">
      <h2 className="section__title to-watch__title">Want to watch</h2>
      {wantToWatchRED.length > 0 ? (
        moviesToWatch
      ) : (
        <p className="no-items-info">
          No movies on Your list...
          <Link className="no-items-info__link" to="/search">
            Search for more
          </Link>
        </p>
      )}
    </section>
  );
};

const mapStateToProps = state => {
  return {
    wantToWatchRED: state.wantToWatch,
    watchedRED: state.watched
  };
};

export default connect(mapStateToProps)(wantToWatch);
