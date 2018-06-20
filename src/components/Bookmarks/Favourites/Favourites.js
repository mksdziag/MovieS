import React from "react";
import { connect } from "react-redux";
import "./Favourites.css";
import FavouritesItem from "./FavouritesItem";

const favourites = props => {
  const { watchedRED } = props;
  const sortedWatchedByUserRating = watchedRED.sort(
    (a, b) => b.my_note - a.my_note
  );
  const top3 = sortedWatchedByUserRating.slice(0, 3);

  const favouritesListItems = top3.map((movie, idx) => {
    const { id, poster_path, my_note, title } = movie;
    return (
      <FavouritesItem
        key={id}
        id={id}
        poster_path={poster_path}
        my_note={my_note}
        idx={idx}
        title={title}
      />
    );
  });

  return (
    <section className="section favourites__section-wrapper">
      <h2 className=" section__title favourites__section-title">My top 3</h2>
      <ul className="favourites__list">{favouritesListItems}</ul>
    </section>
  );
};

const mapStateToProps = state => {
  return {
    watchedRED: state.watched
  };
};

export default connect(mapStateToProps)(favourites);
