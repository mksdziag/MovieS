import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./ToWatch.css";
import ToWatchItem from "./ToWatchItem";
import movieRatingColorize from "../../../assets/helpers/movieRatingColorize";
import SectionTitle from "../../UiElements/SectionTitle";

const toWatch = props => {
  const { toWatchRED } = props;
  const moviesToWatch = toWatchRED.map(movie => {
    const { id, overview, vote_average } = movie;

    let shortenMovieOverwiev = overview.split(" ");
    shortenMovieOverwiev =
      shortenMovieOverwiev.length > 40
        ? shortenMovieOverwiev.slice(0, 40).join(" ") + "..."
        : shortenMovieOverwiev.join(" ");

    const noteColor = movieRatingColorize(vote_average);

    return (
      <ToWatchItem key={id} movieOverwiev={shortenMovieOverwiev} noteColor={noteColor} {...movie} />
    );
  });

  return (
    <section className="section to-watch__wrapper">
      <SectionTitle title="Want to watch" />
      {toWatchRED.length > 0 ? (
        <ul className="to-watch__list">{moviesToWatch}</ul>
      ) : (
        <p className="no-items-info">
          No movies on Your list. Rate them or add to your wish list from our database
          <br />
          <Link className="no-items-info__link" to="/search">
            Search for movies
          </Link>
          <br />
          You can also check currently trending movies.
          <br />
          <Link className="no-items-info__link" to="/trending">
            Trending Movies
          </Link>
        </p>
      )}
    </section>
  );
};

const mapStateToProps = state => {
  return {
    toWatchRED: state.toWatch,
    watchedRED: state.watched,
  };
};

export default connect(mapStateToProps)(toWatch);
