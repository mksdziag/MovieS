import React from "react";
import "./Watched.css";
import { connect } from "react-redux";
import WatchedItem from "./WatchedItem";
import movieRatingColorize from "../../../assets/movieRatingColorize";
import { withRouter } from "react-router-dom";

const watched = props => {
  const { watchedRED } = props;
  const watchedList = watchedRED.map(movie => {
    const {
      id,
      poster_path,
      vote_average,
      my_note,
      title,
      release_date
    } = movie;
    const noteBackground = movieRatingColorize(vote_average);

    return (
      <WatchedItem
        key={id}
        id={id}
        noteBackground={noteBackground}
        vote_average={vote_average}
        my_note={my_note}
        title={title}
        poster_path={poster_path}
        release_date={release_date}
      />
    );
  });

  return (
    <section className="section watched__section-wrapper">
      <h2 className="section__title watched__section-title">Watched movies</h2>
      <ul className="watched__list">{watchedList}</ul>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    wantToWatchRED: state.wantToWatch,
    watchedRED: state.watched
  };
};

export default withRouter(connect(mapStateToProps)(watched));
