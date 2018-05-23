import React from "react";
import "./WantToWatch.css";
import Rating from "../../Rating/Rating";

const wantToWatch = props => {
  const { movies, userRatingHandler } = props;
  const moviesToWatch = movies.map(movie => {
    const {
      id,
      poster_path,
      vote_average,
      title,
      release_date,
      overview
    } = movie;
    const noteBackground = { backgroundColor: "" };
    if (vote_average >= 7) {
      noteBackground.backgroundColor = "#288112";
    } else if (vote_average >= 5) {
      noteBackground.backgroundColor = "#d17e11";
    } else if (vote_average > 0) {
      noteBackground.backgroundColor = "#d11111";
    } else {
      noteBackground.backgroundColor = "rgba(128, 128, 128, 0.5)";
    }
    return (
      <div className="to-watch__item" key={id}>
        <div className="to-watch__cover-wrapper">
          <img
            className="to-watch__movie-cover"
            src={poster_path && `https://image.tmdb.org/t/p/w500${poster_path}`}
            alt="movie cover"
          />
          <span style={noteBackground} className="to-watch__note">
            {vote_average}
          </span>
          <Rating
            userRatingHandler={e => userRatingHandler(e.target.value, id)}
          />
        </div>
        <div>
          <h3 className="to-watch__movie-title">"{title}"</h3>
          <p className="to-watch__release-date">Released: {release_date}</p>
          <p className="to-watch__desc">{overview}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="to-watch__wrapper">
      <h2 className="to-watch__title">Want to watch</h2>
      {moviesToWatch}
    </div>
  );
};

export default wantToWatch;
