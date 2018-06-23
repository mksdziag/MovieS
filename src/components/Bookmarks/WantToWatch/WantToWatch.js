import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./WantToWatch.css";
import WantToWatchItem from "./WantToWatchItem";
import movieRatingColorize from "../../../assets/movieRatingColorize";
import SectionTitle from "../../UiElements/SectionTitle";

const wantToWatch = props => {
  const { wantToWatchRED } = props;
  const moviesToWatch = wantToWatchRED.map(movie => {
    const { id, overview, vote_average } = movie;

    let movieOverwiev = overview.split(" ");
    movieOverwiev =
      movieOverwiev.length > 40
        ? movieOverwiev.slice(0, 40).join(" ") + "..."
        : movieOverwiev.join(" ");

    const noteBackground = movieRatingColorize(vote_average);

    return (
      <WantToWatchItem
        key={id}
        movieOverwiev={movieOverwiev}
        noteBackground={noteBackground}
        {...movie}
      />
    );
  });

  return (
    <section className="section to-watch__wrapper">
      <SectionTitle title="Want to watch" />
      {wantToWatchRED.length > 0 ? (
        <ul className="to-watch__list">{moviesToWatch}</ul>
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
