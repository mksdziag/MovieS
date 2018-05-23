import React from "react";
import "./Favourites.css";

const favourites = props => {
  const { movies } = props;
  const sortedWatchedByUserRating = movies.sort(
    (a, b) => b.my_note >= a.my_note
  );
  const top3 = sortedWatchedByUserRating.slice(0, 3);

  const favouritesListItems = top3.map((movie, idx) => {
    const { id, poster_path, my_note, title } = movie;
    return (
      <li className="favourites__list-item" key={id}>
        <div className="favourites__cover-wrapper">
          <img
            className="favourites__movie-cover"
            src={poster_path && `https://image.tmdb.org/t/p/w500${poster_path}`}
            alt="movie cover"
          />
          <span className="favourites__my-note">{my_note}</span>
          <span className="favourites__place">{idx + 1}.</span>
        </div>
        <div>
          <h3 className="favourites__movie-title">"{title}"</h3>
        </div>
      </li>
    );
  });

  return (
    <section className="favourites__section-wrapper">
      <h2 className="favourites__section-title">My top 3</h2>
      <ul className="favourites__list">{favouritesListItems}</ul>
    </section>
  );
};

export default favourites;
