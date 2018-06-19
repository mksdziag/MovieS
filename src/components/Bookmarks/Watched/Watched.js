import React from "react";
import { Route } from "react-router-dom";
import "./Watched.css";
import { connect } from "react-redux";
import WatchedItem from "./WatchedItem";
import movieRatingColorize from "../../../assets/movieRatingColorize";
import MoviePage from "../../MoviePage/MoviePage";

const watched = props => {
  const { watchedRED } = props;
  const watchedList = watchedRED.map(movie => {
    const { id, poster_path, vote_average, my_note, title } = movie;
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
      />
    );
  });

  return (
    <div className="watched__section-wrapper">
      <h2 className="watched__section-title">Watched movies</h2>
      <ul className="watched__list">{watchedList}</ul>
      <Route path="/moviePage" component={MoviePage} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    wantToWatchRED: state.wantToWatch,
    watchedRED: state.watched
  };
};

export default connect(mapStateToProps)(watched);
