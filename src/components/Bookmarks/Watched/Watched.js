import React from "react";
import "./Watched.css";
import { connect } from "react-redux";
import WatchedItem from "./WatchedItem";
import movieRatingColorize from "../../../assets/movieRatingColorize";
import { withRouter } from "react-router-dom";
import SectionTitle from "../../UiElements/SectionTitle";

const watched = props => {
  const { watchedRED } = props;
  const watchedList = watchedRED.map(movie => {
    const { id, vote_average } = movie;
    const noteBackground = movieRatingColorize(vote_average);

    return <WatchedItem key={id} noteBackground={noteBackground} {...movie} />;
  });

  return (
    <section className="section watched__section-wrapper">
      <SectionTitle title="Watched" />
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
