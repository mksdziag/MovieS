import React from "react";
import { connect } from "react-redux";

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
    <div className="to-watch__wrapper">
      <h2 className="to-watch__title">Want to watch</h2>
      {moviesToWatch}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    wantToWatchRED: state.wantToWatch,
    watchedRED: state.watched
  };
};

export default connect(mapStateToProps)(wantToWatch);
