import React from "react";
import { connect } from "react-redux";
import "./Favourites.css";
import FavouritesItem from "./FavouritesItem";
import SectionTitle from "../../UiElements/SectionTitle";

const favourites = props => {
  const { watchedRED } = props;
  const sortedWatchedByUserRating = watchedRED.sort(
    (a, b) => b.my_note - a.my_note
  );
  const top3 = sortedWatchedByUserRating.slice(0, 3);

  const favouritesListItems = top3.map((movie, idx) => {
    const { id } = movie;
    return <FavouritesItem key={id} idx={idx} {...movie} />;
  });

  return (
    <section className="section favourites__section-wrapper">
      <SectionTitle title="My favourites" />
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
